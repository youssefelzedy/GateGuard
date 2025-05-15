import WebSocket from 'ws';
import * as fs from 'fs';
import * as path from 'path';

import Camera from './models/cameraModel';
// import { checkTheAcceptedPlate } from './controllers/logsController';
import { prepareCarDetection, preparePlateDetection } from './utils/handleLogCreation';

const imagePath = path.join(__dirname, 'image1.jpg'); // Static image path

let ws: WebSocket;

const startWsClient = () => {
  ws = new WebSocket('ws://localhost:8000/ws');

  ws.on('open', async () => {
    console.log('WebSocket connection established.');

    const cameras = await Camera.find();

    if (cameras.length === 0) {
      console.log('No cameras found. Exiting...');
      return;
    }

    let currentIndex = 0;

    const sendImage = async () => {
      const camera = cameras[currentIndex];
      console.log('Camera IP ==============> :', camera.cameraIP);

      if (ws.readyState === WebSocket.OPEN) {
        try {
          const imageBuffer = fs.readFileSync(camera.cameraIP);
          const imageBase64 = imageBuffer.toString('base64');
          ws.send(imageBase64);
          console.log('Image sent at', new Date().toLocaleTimeString());
        } catch (err) {
          console.error('Error reading or sending image:', err);
        }
      }
    };

    ws.on('message', async (message: string) => {
      try {
        const resultArray = JSON.parse(message);
        console.log('Received result array:', resultArray);

        console.log(typeof(resultArray));

        // Make sure the garageId is a string for MongoDB
        const garageId = cameras[currentIndex].garage.toString();

        // Check in the database if the plate is already registered
        // Add await here and handle the result
        // const status = await checkTheAcceptedPlate(resultArray, garageId); // [access, denied, accepted]
        console.log('Plate check status:', status);

        // Prepare the data to be create the log
        const carDetection = prepareCarDetection(resultArray);
        const plateDetection = preparePlateDetection(resultArray);

        // Move to next camera after receiving response
        currentIndex = (currentIndex + 1) % cameras.length;

        // Send next image after short delay
        setTimeout(sendImage, 1000);
      } catch (err) {
        console.error('Failed to parse result:', err);
      }
    });

    // Start with the first camera
    sendImage();
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed. Retrying in 5s...');
    setTimeout(startWsClient, 5000);
  });
};

export default startWsClient;
