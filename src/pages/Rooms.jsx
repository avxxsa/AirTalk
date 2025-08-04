import React, { useEffect, useRef, useState } from 'react';
import './Chat.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  queuePendingMessage,
  getPendingMessages,
  clearPendingMessages,
  getMessagesByRoom,
  storeMessage
} from '../utils/db';

const Rooms = () => {
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const socketRef = useRef(null);
  const peers = useRef({});
  const dataChannels = useRef({});
  const chatContainersRef = useRef({});
  const SIGNALING_URL = import.meta.env.VITE_SIGNALING_URL || 'ws://localhost:3000';

  const inputRef = useRef();

  const getRoomId = (a, b) => [a, b].sort().join('-');

  const handleConnect = () => {
    if (!username.trim()) return;

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("Already connected");
      return;
    }

    const socket = new WebSocket(SIGNALING_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send(JSON.stringify({ type: 'register', username }));
      setConnected(true);
      localStorage.setItem("airtalk-username", username);

      peers.current = {};
      dataChannels.current = {};
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

    channel.onopen = async () => {
      setCurrentChat(user);
      localStorage.setItem("currentChat", user);

      const roomId = getRoomId(username, user);
      try {
        const history = await getMessagesByRoom(roomId);
        if (Array.isArray(history)) {
          for (const msg of history) {
            appendMessage(user, `${msg.sender}: ${msg.content}`);
          }
        } else {
          appendMessage(user, "[System] Failed to load previous messages.");
        }
      } catch (err) {
        appendMessage(user, "[System] Error loading message history.");
      }

      appendMessage(user, `[System]: Connected to ${user}`);

      const pending = await getPendingMessages(roomId);
      for (const msg of pending) {
        channel.send(msg.content);
        appendMessage(user, `You (sent later): ${msg.content}`);
      }

      if (pending.length > 0) {
        await clearPendingMessages(roomId);
      }
    };

    channel.onmessage = async (e) => {
      setCurrentChat(user);
      localStorage.setItem("currentChat", user);
      const roomId = getRoomId(username, user);

      appendMessage(user, `${user}: ${e.data}`);

      await storeMessage({
        roomId,
        sender: user,
        content: e.data,
        timestamp: new Date()
      });
    };

    channel.onclose = () => appendMessage(user, `[System]: ${user} disconnected`);
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

  const handleSend = async (e) => {
    if (e.key === 'Enter' && message.trim()) {
      const channel = dataChannels.current[currentChat];
      appendMessage(currentChat, `You: ${message}`);

      const roomId = getRoomId(username, currentChat);

      if (channel?.readyState === 'open') {
        channel.send(message);
      } else {
        await queuePendingMessage({ roomId, content: message });
      }

      await storeMessage({
        roomId,
        sender: username,
        content: message,
        timestamp: new Date()
      });

      setMessage('');
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const savedChat = localStorage.getItem("currentChat");

    if (storedUser?.fullName) {
      setUsername(storedUser.fullName);
      setTimeout(() => handleConnect(), 300);
    }

    if (savedChat) {
      setCurrentChat(savedChat);
    }
  }, []);

   return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-6">
        <div style={{ maxWidth: 700, margin: 'auto', fontFamily: 'sans-serif' }}>
          <h2 className="text-2xl font-semibold mb-4">AirTalk</h2>
          <input
            value={username}
            disabled
            className="w-full border border-gray-300 px-4 py-2 rounded mb-2 bg-gray-100"
          />
          <button
            onClick={handleConnect}
            disabled={connected}
            className="bg-[#E5989B] text-white px-4 py-2 rounded hover:bg-[#d88a8d] mb-4"
          >
            Connect
          </button>

          <div className="mb-4">
            <b>Online users:</b><br />
            <p className="text-sm text-gray-600 mb-2">Click on a user to start a private chat</p>
            {users.map(u => (
              <div key={u}>
                <button
                  onClick={() => {
                    startConnection(u);
                    setCurrentChat(u);
                    localStorage.setItem("currentChat", u);
                  }}
                  disabled={!!dataChannels.current[u]}
                  style={{ opacity: dataChannels.current[u] ? 0.5 : 1 }}
                  className="bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded mb-1 text-sm"
                >
                  {u}
                </button>
              </div>
            ))}
          </div>

          <div id="chatTabs" className="flex border-b border-gray-300 mb-2">
            {Object.keys(dataChannels.current).map(user => (
              <div
                key={user}
                className={`cursor-pointer px-4 py-2 border border-gray-300 mr-2 rounded-t ${currentChat === user ? 'bg-gray-200 font-bold' : ''}`}
                onClick={async () => {
                  setCurrentChat(user);
                  localStorage.setItem("currentChat", user);

                  const container = chatContainersRef.current[user];
                  if (container && container.childElementCount === 0) {
                    try {
                      const history = await getMessagesByRoom(user);
                      history.forEach(msg => {
                        appendMessage(user, `${msg.sender}: ${msg.content}`);
                      });
                    } catch {
                      appendMessage(user, "[System] Error loading chat history.");
                    }
                  }
                }}
              >
                {user}
              </div>
            ))}
          </div>

          <div id="chatContainers" className="mb-4">
            {[...new Set([...Object.keys(dataChannels.current), currentChat])].filter(Boolean).map(user => (
              <div
                key={user}
                className="chatWindow"
                ref={el => (chatContainersRef.current[user] = el)}
                style={{
                  display: currentChat === user ? 'block' : 'none',
                  height: '300px',
                  overflowY: 'auto',
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '1rem',
                  background: '#fafafa',
                  borderRadius: '4px'
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
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rooms;

