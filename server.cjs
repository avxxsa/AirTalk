const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const dotenv=require('dotenv');

dotenv.config();
const SIGNALING_URL = process.env.SIGNALING_URL || 'ws://localhost:3000';
console.log(SIGNALING_URL);
const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, 'dist', decodeURIComponent(filePath));
  const extname = String(path.extname(filePath)).toLowerCase();

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, extname === '.html' ? 'utf8' : null, (error, content) => {
    if (error) {
      // SPA fallback: serve index.html
  fs.readFile(path.join(__dirname, 'dist', 'index.html'), 'utf8', (err, fallbackContent) => {
    if (err) {
      res.writeHead(500);
      res.end('Server error: ' + err.code);
    } else {
      const rendered = fallbackContent.replace('{{SIGNALING_URL}}', `"${SIGNALING_URL}"`);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(rendered, 'utf-8');
    }
  });
    } else {
      if (extname === '.html') {
        const rendered = content.replace('{{SIGNALING_URL}}', `"${SIGNALING_URL}"`);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(rendered, 'utf-8');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    }
  });
});

const wss = new WebSocket.Server({ server });
const peers = new Map();

wss.on('connection', (ws) => {
  let username = null;

  ws.on('message', (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch {
      return;
    }

    switch (data.type) {
      case 'register':
        username = data.username;
        peers.set(username, ws);
        broadcastUserList();
        break;

      case 'offer':
      case 'answer':
      case 'candidate': {
        const target = peers.get(data.to);
        if (target && target.readyState === WebSocket.OPEN) {
          target.send(JSON.stringify({ ...data, from: username }));
        }
        break;
      }
    }
  });

  ws.on('close', () => {
    if (username) {
      peers.delete(username);
      broadcastUserList();
    }
  });
});

function broadcastUserList() {
  const users = Array.from(peers.keys());
  const msg = JSON.stringify({ type: 'user_list', users });
  for (const ws of peers.values()) {
    if (ws.readyState === WebSocket.OPEN) ws.send(msg);
  }
}

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
