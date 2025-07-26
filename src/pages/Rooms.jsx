import React, { useEffect, useRef, useState } from 'react';
import './Chat.css'; // Move styles from <style> into this file

const Chat = () => {
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const socketRef = useRef(null);
  const peers = useRef({});
  const dataChannels = useRef({});
  const chatContainersRef = useRef({});
  const SIGNALING_URL = process.env.REACT_APP_SIGNALING_URL || 'ws://localhost:3000';

  const inputRef = useRef();

  const handleConnect = () => {
    if (!username.trim()) return alert("Enter a username");
    const socket = new WebSocket(SIGNALING_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'register', username }));
      setConnected(true);
    };

    socket.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      switch (msg.type) {
        case 'user_list':
          setUsers(msg.users.filter(u => u !== username));
          break;
        case 'offer':
          await handleOffer(msg.offer, msg.from);
          break;
        case 'answer':
          await peers.current[msg.from]?.setRemoteDescription(new RTCSessionDescription(msg.answer));
          break;
        case 'candidate':
          if (msg.candidate) {
            await peers.current[msg.from]?.addIceCandidate(new RTCIceCandidate(msg.candidate));
          }
          break;
      }
    };
  };

  const createPeerConnection = (user) => {
    if (peers.current[user]) peers.current[user].close();

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:192.168.18.13:3478",
          username: "webrtcuser",
          credential: "webrtcpass"
        }
      ]
    });

    pc.onicecandidate = ({ candidate }) => {
      if (candidate) {
        socketRef.current.send(JSON.stringify({ type: 'candidate', to: user, candidate }));
      }
    };

    peers.current[user] = pc;
    return pc;
  };

  const setupDataChannel = (user, channel) => {
    dataChannels.current[user] = channel;
    channel.onopen = () => {
      setCurrentChat(user);
    };
    channel.onmessage = e => appendMessage(user, `${user}: ${e.data}`);
    channel.onclose = () => appendMessage(user, `${user} disconnected`);
  };

  const startConnection = async (to) => {
    const pc = createPeerConnection(to);
    const dc = pc.createDataChannel("chat");
    setupDataChannel(to, dc);

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socketRef.current.send(JSON.stringify({ type: 'offer', to, offer }));
  };

  const handleOffer = async (offer, from) => {
    const pc = createPeerConnection(from);
    pc.ondatachannel = e => setupDataChannel(from, e.channel);

    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socketRef.current.send(JSON.stringify({ type: 'answer', to: from, answer }));
  };

  const appendMessage = (user, msg) => {
    const container = chatContainersRef.current[user];
    if (container) {
      const div = document.createElement('div');
      div.textContent = msg;
      container.appendChild(div);
    }
  };

  const handleSend = (e) => {
    if (e.key === 'Enter' && message.trim() && dataChannels.current[currentChat]?.readyState === 'open') {
      dataChannels.current[currentChat].send(message);
      appendMessage(currentChat, `You: ${message}`);
      setMessage('');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>AirTalk</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Your name"
        disabled={connected}
      />
      <button onClick={handleConnect} disabled={connected}>Connect</button>

      <div style={{ margin: '10px 0' }}>
        <b>Online users:</b><br />
        {users.map(u => (
          <div key={u}>
            <button onClick={() => startConnection(u)}>{u}</button>
          </div>
        ))}
      </div>

      <div id="chatTabs" style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        {Object.keys(dataChannels.current).map(user => (
          <div
            key={user}
            className={`tab ${currentChat === user ? 'active' : ''}`}
            style={{
              padding: '8px',
              cursor: 'pointer',
              border: '1px solid #ccc',
              marginRight: '4px',
              borderBottom: currentChat === user ? 'none' : undefined,
              background: currentChat === user ? '#eee' : undefined,
              fontWeight: currentChat === user ? 'bold' : undefined
            }}
            onClick={() => setCurrentChat(user)}
          >
            {user}
          </div>
        ))}
      </div>

      <div id="chatContainers">
        {Object.keys(dataChannels.current).map(user => (
          <div
            key={user}
            className="chatWindow"
            ref={el => (chatContainersRef.current[user] = el)}
            style={{
              display: currentChat === user ? 'block' : 'none',
              height: '300px',
              overflowY: 'auto',
              border: '1px solid #ccc',
              padding: '10px'
            }}
          />
        ))}
      </div>

      <input
        ref={inputRef}
        id="input"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleSend}
        placeholder="Type a message..."
        disabled={!currentChat}
        style={{ width: '100%', marginTop: 10, padding: 8 }}
      />
    </div>
  );
};

export default Chat;
