import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';

const IMAGE_PATH = path.join(__dirname, 'image.jpg');
// Use the PORT from environment or default to 5174 (your server port)
const WS_PORT = process.env.AIPORT || 8000;
const WS_URL = `const WS_URL = ws://https://8000-ahmedgaberelb-challenge-h3yaj5njso7.ws-eu118.gitpod.io:${WS_PORT}/ws;
`;

function getImageBase64(): string {
  try {
    const imageBuffer = fs.readFileSync(IMAGE_PATH);
    return imageBuffer.toString('base64');
  } catch (error) {
    console.error(`Error reading image from ${IMAGE_PATH}:`, error);
    return '';
  }
}

export default function startWsClient() {
  try {
    const ws = new WebSocket(WS_URL);

    ws.on('open', () => {
      console.log('Connected to AI WebSocket server');

      const interval = setInterval(() => {
        try {
          const imageBase64 = getImageBase64();
          if (imageBase64) {
            ws.send(imageBase64);
          }
        } catch (error) {
          console.error('Error sending image:', error);
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

    ws.on('error', (err) => {
      console.error('WebSocket connection error:', err.message);
    });
  } catch (error) {
    console.error('Failed to create WebSocket client:', error);
  }
}
