import React, { useState, useEffect, useRef } from 'react';

function Chat() {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [roomName, setRoomName] = useState('general');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const chatRef = useRef(null);

  useEffect(() => {
    const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
    setSocket(newSocket);
    setChatMessages([]);

    newSocket.onopen = () => {
      console.log('✅ WebSocket conectado a sala:', roomName);
    };

    newSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.message) {
        setChatMessages(prev => [...prev, data.message]);
      }
    };

    newSocket.onclose = (e) => {
      console.warn('⚠️ WebSocket cerrado:', e);
    };

    return () => newSocket.close();
  }, [roomName]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessage = () => {
    if (!username.trim()) {
      alert('Debes ingresar tu nombre antes de enviar mensajes.');
      return;
    }

    if (socket && socket.readyState === WebSocket.OPEN && message.trim()) {
      const content = `${username}: ${message}`;
      socket.send(JSON.stringify({ message: content }));
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    localStorage.setItem('username', e.target.value);
  };

  const getUsernameColor = (name) => {
    const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const parseMessage = (msg) => {
    const [name, ...rest] = msg.split(': ');
    const text = rest.join(': ');
    const color = getUsernameColor(name);
    return (
      <div>
        <strong style={{ color }}>{name}:</strong> {text}
      </div>
    );
  };

  return (
    <div>
      <h1>Chat en Tiempo Real</h1>

      <label>
        Tu nombre:&nbsp;
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Ej: Gabriel"
          style={{ marginBottom: '10px' }}
        />
      </label>
      <br />

      <label>
        Sala:&nbsp;
        <select value={roomName} onChange={e => setRoomName(e.target.value)}>
          <option value="general">General</option>
          <option value="dev">Dev</option>
          <option value="soporte">Soporte</option>
          <option value="random">Random</option>
        </select>
      </label>

      <div
        ref={chatRef}
        style={{ border: '1px solid #ccc', height: '200px', overflowY: 'auto', padding: '10px', marginTop: '10px' }}
      >
        {chatMessages.map((msg, index) => (
          <div key={index}>💬 {parseMessage(msg)}</div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe tu mensaje..."
        style={{ width: '60%' }}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default Chat;