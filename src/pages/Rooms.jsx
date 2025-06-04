// src/pages/ChatRoom.jsx

import React, { useEffect, useState, useRef } from 'react';

export default function ChatRoom() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState(null);
  const [openRooms, setOpenRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [creatingRoom, setCreatingRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomType, setNewRoomType] = useState('open');

  const messageRef = useRef(null);

  useEffect(() => {
    const name = prompt('Enter your name:') || 'Guest';
    setUsername(name);
    const ws = new WebSocket(`ws://${location.host}`);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'list' }));
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      switch (msg.type) {
        case 'room_list':
          setOpenRooms(msg.rooms);
          break;
        case 'room_joined':
          setRoom(msg.room);
          if (msg.code) {
            addMessage(`You joined private room "${msg.room}" with code: ${msg.code}`);
          } else {
            addMessage(`You joined room: ${msg.room}`);
          }
          break;
        case 'chat':
          addMessage(`[${msg.timestamp}] ${msg.user}: ${msg.text}`);
          break;
        case 'error':
          alert(msg.text);
          break;
        default:
          console.warn('Unknown message:', msg);
      }
    };
    setSocket(ws);
    return () => ws.close();
  }, []);

  useEffect(() => {
    messageRef.current?.scrollTo(0, messageRef.current.scrollHeight);
  }, [messages]);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  const sendMessage = () => {
    if (input.trim()) {
      socket.send(JSON.stringify({ type: 'chat', text: input.trim() }));
      setInput('');
    }
  };

  const joinRoom = (name) => {
    socket.send(JSON.stringify({ type: 'join', user: username, room: name }));
  };

  const joinWithCode = () => {
    if (roomCode.trim()) {
      socket.send(JSON.stringify({ type: 'join', user: username, code: roomCode.trim() }));
    }
  };

  const createRoom = () => {
    if (newRoomName.trim()) {
      socket.send(JSON.stringify({
        type: 'create',
        user: username,
        name: newRoomName.trim(),
        isPrivate: newRoomType === 'private'
      }));
    }
  };

  if (!socket) return <div className="p-4">Connecting...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      {!room ? (
        <>
          <h2 className="text-2xl font-bold mb-2">Welcome, {username}</h2>

          <div className="mb-4">
            <button
              onClick={() => setCreatingRoom(!creatingRoom)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              {creatingRoom ? 'Cancel' : 'Create Room'}
            </button>
            {creatingRoom && (
              <div className="mt-2">
                <input
                  className="border px-2 py-1 mr-2"
                  placeholder="Room name"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                />
                <select
                  value={newRoomType}
                  onChange={(e) => setNewRoomType(e.target.value)}
                  className="border px-2 py-1 mr-2"
                >
                  <option value="open">Open</option>
                  <option value="private">Private</option>
                </select>
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={createRoom}
                >
                  Create
                </button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Join Open Room:</h3>
            {openRooms.length === 0 ? (
              <p>No open rooms.</p>
            ) : (
              openRooms.map((r) => (
                <button
                  key={r}
                  onClick={() => joinRoom(r)}
                  className="block border px-3 py-1 my-1 rounded hover:bg-gray-200"
                >
                  {r}
                </button>
              ))
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-1">Join with Code:</h3>
            <input
              className="border px-2 py-1 mr-2"
              placeholder="Room code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />
            <button
              className="bg-purple-600 text-white px-3 py-1 rounded"
              onClick={joinWithCode}
            >
              Join
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            ref={messageRef}
            className="border h-72 overflow-y-auto p-2 bg-gray-100 mb-2"
          >
            {messages.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </div>
          <input
            className="border w-full px-2 py-1"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
        </>
      )}
    </div>
  );
}
