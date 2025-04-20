import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';

const IMAGE_PATH = path.join(__dirname, 'image.jpg');
const WS_URL = 'ws://localhost:8000/ws';

function getImageBase64(): string {
  const imageBuffer = fs.readFileSync(IMAGE_PATH);
  return imageBuffer.toString('base64');
}

export default function startWsServer() {
  const ws = new WebSocket(WS_URL);

  ws.on('open', () => {
    console.log('Connected to AI WebSocket server');

    const interval = setInterval(() => {
      try {
        const imageBase64 = getImageBase64();
        ws.send(imageBase64);
      } catch (error) {
        console.error('Error reading image:', error);
      }
    }, 1000);

    ws.on('message', (data: WebSocket.Data) => {
      console.log('AI Response:', data.toString());
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      clearInterval(interval);
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err.message);
    });
  });
}
