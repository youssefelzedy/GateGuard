import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import ffmpeg from 'fluent-ffmpeg';

import logsController from './controllers/logsController';

const VIDEO_PATH = path.join(__dirname, 'video_input_22.mp4'); // Your video path
const FRAME_OUTPUT_DIR = path.join(__dirname, 'frames');
const CURRENT_FRAME_PATH = path.join(FRAME_OUTPUT_DIR, 'current_frame.jpg');

// Use the PORT from environment or default to 8000
const WS_PORT = process.env.AIPORT || 8000;
const WS_URL = `ws://10.182.241.79:${WS_PORT}/ws`;

// Create frames directory if it doesn't exist
if (!fs.existsSync(FRAME_OUTPUT_DIR)) {
  fs.mkdirSync(FRAME_OUTPUT_DIR, { recursive: true });
}

// Function to extract current frame from video using ffmpeg
function extractCurrentFrame(
  videoPath: string,
  outputPath: string,
  timeInSeconds: number,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .screenshots({
        timestamps: [timeInSeconds],
        filename: 'current_frame.jpg',
        folder: FRAME_OUTPUT_DIR,
        size: '640x?',
      })
      .on('end', () => {
        console.log('sending');
        resolve(true);
      })
      .on('error', (err) => {
        console.error('Error extracting frame:', err);
        reject(false);
      });
  });
}

// Get base64 of the current frame
function getFrameBase64(framePath: string): string {
  try {
    if (fs.existsSync(framePath)) {
      const frameBuffer = fs.readFileSync(framePath);
      
      // Convert to base64 - ensure it's properly formatted
      const base64Data = frameBuffer.toString('base64');
      
      // Debug info
      console.log(`Frame read from ${framePath}, size: ${frameBuffer.length} bytes`);
      
      return base64Data;
    } else {
      console.error(`Frame file not found: ${framePath}`);
      return '';
    }
  } catch (error) {
    console.error(`Error reading frame from ${framePath}:`, error);
    return '';
  }
}

// Function to get video duration in seconds
async function getVideoDuration(videoPath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        console.error('Error getting video duration:', err);
        reject(err);
        return;
      }

      if (metadata && metadata.format && metadata.format.duration) {
        resolve(metadata.format.duration);
      } else {
        reject(new Error('Could not determine video duration'));
      }
    });
  });
}

export default async function startWsClient() {
  try {
    console.log(`Starting WebSocket client. Connecting to: ${WS_URL}`);
    
    if (!fs.existsSync(VIDEO_PATH)) {
      console.error(`Video file not found at ${VIDEO_PATH}`);
      return;
    } else {
      console.log(`Video file found at: ${VIDEO_PATH}`);
    }

    const ws = new WebSocket(WS_URL);
    let currentTime = 0;
    let videoDuration = 0;
    let isConnected = false;

    ws.on('open', () => {
      isConnected = true;
      console.log('Connected to AI WebSocket server');
      
      // Test message
      ws.send('CONNECTION_TEST');
      console.log('Sent connection test message');

      try {
        // Try to start video processing after confirming connection
        startVideoProcessing();
      } catch (error) {
        console.error('Error starting video processing:', error);
      }
    });

    async function startVideoProcessing() {
      try {
        videoDuration = await getVideoDuration(VIDEO_PATH);
        console.log(`Video duration: ${videoDuration} seconds`);
      } catch (error) {
        console.error('Failed to get video duration, using default processing method');
      }

      const interval = setInterval(async () => {
        if (!isConnected) {
          console.log('WebSocket disconnected, stopping frame extraction');
          clearInterval(interval);
          return;
        }

        try {
          // Extract the current frame
          await extractCurrentFrame(VIDEO_PATH, CURRENT_FRAME_PATH, currentTime);

          // Verify the frame was created
          if (!fs.existsSync(CURRENT_FRAME_PATH)) {
            console.error(`Frame not found at ${CURRENT_FRAME_PATH}`);
            return;
          }

          // Get file stats for debug
          const fileStats = fs.statSync(CURRENT_FRAME_PATH);
          console.log(`Frame file size: ${fileStats.size} bytes`);

          // Convert frame to base64 and send
          const frameBase64 = getFrameBase64(CURRENT_FRAME_PATH);

          if (frameBase64 && frameBase64.length > 0) {
            console.log(`Base64 string length: ${frameBase64.length}`);
            
            // Send the frame
            ws.send(frameBase64);
            console.log(`Sent frame at ${currentTime} seconds`);
          } else {
            console.error('Failed to get base64 data from frame');
          }

          // Increment time for next frame
          currentTime += 1;

          // Loop back to beginning if we reach the end of the video
          if (videoDuration && currentTime >= videoDuration) {
            console.log('Reached end of video, restarting from beginning');
            currentTime = 0;
          }
        } catch (error) {
          console.error('Error processing video frame:', error);
        }
      }, 1500 ); // Extract frame every 1 second

      ws.on('message', (data: WebSocket.Data) => {
        const response = data.toString();
        console.log(`AI Response: ${response}`);
      });

      ws.on('close', () => {
        isConnected = false;
        console.log('WebSocket connection closed');
        clearInterval(interval);
      });

      ws.on('error', (err) => {
        console.error('WebSocket error:', err.message);
      });
    }

    // Set timeout for connection
    setTimeout(() => {
      if (!isConnected) {
        console.error('Failed to connect to WebSocket server within timeout');
      }
    }, 5000);

    ws.on('error', (err) => {
      console.error('WebSocket connection error:', err.message);
    });
  } catch (error) {
    console.error('Failed to create WebSocket client:', error);
  }
}
