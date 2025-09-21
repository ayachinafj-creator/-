import React, { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  // 获取消息
  useEffect(() => {
    fetch('http://localhost:3001/api/messages')
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // 发送消息
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!username || !text) return;
    const res = await fetch('http://localhost:3001/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, text }),
    });
    const newMsg = await res.json();
    setMessages([...messages, newMsg]);
    setText('');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
      <h2>简单聊天室</h2>
      <div style={{ minHeight: 200, marginBottom: 16, background: '#fafafa', padding: 8, borderRadius: 4 }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <b>{msg.username}</b> [{msg.time}]: {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="你的昵称"
          style={{ width: '30%', marginRight: 8 }}
        />
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="输入消息"
          style={{ width: '50%', marginRight: 8 }}
        />
        <button type="submit">发送</button>
      </form>
    </div>
  );
}

export default App;