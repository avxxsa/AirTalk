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
