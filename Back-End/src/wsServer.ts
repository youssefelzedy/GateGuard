import WebSocket from 'ws';
import * as fs from 'fs';
import * as path from 'path';

import Camera from './models/cameraModel';

const imagePath = path.join(__dirname, 'image.jpg'); // Static image path

let ws: WebSocket;

const startWsClient = () => {
  ws = new WebSocket('ws://localhost:8000/ws');

  ws.on('open', async () => {
    console.log('WebSocket connection established.');

    // Find all camera devices and send image data every second
    let cameras = await Camera.find();

    if (cameras.length === 0) {
      console.log('No cameras found. Exiting...');
      return;
    }
    console.log('Found cameras:', cameras);
    setInterval(() => {
      try {
        // Loop on all cameras and send image data
        cameras.forEach((camera) => {
          console.log('Camera IP ==============> :', camera.cameraIP);
          if (ws.readyState === WebSocket.OPEN) {
            const imageBuffer = fs.readFileSync(imagePath);
            const imageBase64 = imageBuffer.toString('base64');
            ws.send(imageBase64);
            console.log('Image sent at', new Date().toLocaleTimeString());
          }
        });
      } catch (err) {
        console.error('Error reading or sending image:', err);
      }
    }, 1000);
  });

  ws.on('message', (message: string) => {
    try {
      const resultArray = JSON.parse(message);
      console.log('Received result array:', resultArray);
    } catch (err) {
      console.error('Failed to parse result:', err);
    }
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed. Retrying in 5s...');
    setTimeout(startWsClient, 5000); // Auto-reconnect
  });
};

export default startWsClient;
