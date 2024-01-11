import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 3050;

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send('WebSocket server is running!');
});

server.listen(PORT, () => {
  console.log('Server is listening on port ${PORT}');
  const address = server.address();
  const wsUrl = `ws://localhost:${PORT}`;
  console.log(`WebSocket URL: ${wsUrl}`);
});
