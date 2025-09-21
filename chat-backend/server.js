const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let messages = [];

// 获取所有消息
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// 发送一条消息
app.post('/api/messages', (req, res) => {
  const { username, text } = req.body;
  if (!username || !text) {
    return res.status(400).json({ error: '用户名和内容不能为空' });
  }
  const message = { username, text, time: new Date().toLocaleTimeString() };
  messages.push(message);
  res.json(message);
});

app.listen(PORT, () => {
  console.log(`服务器已启动，端口：${PORT}`);
});
