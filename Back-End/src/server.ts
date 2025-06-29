import http from 'http';
import dotenv from 'dotenv';
import WebSocket from 'ws';
import dbConnect from '../config/dbConnect';
import app from './app';
import startWsClient from './wsServer';
import mqttClient from './utils/mqttClient';

dotenv.config({ path: './config.env' });

dbConnect();

const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    // Handle incoming messages
    console.log('Received image data, length:', message.toString().length);

    // Example response
    ws.send('Image received');
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

const PORT = process.env.PORT || 8000;
console.log('PORT:', PORT);
server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log('MQTT client initialized');

  // Only start the WS client if needed
  // startWsClient();
});

process.on('unhandledRejection', (err: Error) => {
  // listting to event+++++
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  mqttClient.disconnect();
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  mqttClient.disconnect();
  server.close(() => {
    process.exit(0);
  });
});
