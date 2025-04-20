import http from 'http';
import dotenv from 'dotenv';
import dbConnect from '../config/dbConnect';
import app from './app';
import startWsClient from './wsServer';

dotenv.config({ path: './config.env' });

dbConnect();

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;
console.log('PORT:', PORT);
server.listen(PORT, () => {
  startWsClient();
  console.log(`Server is running on port: ${PORT} `);
});

process.on('unhandledRejection', (err: Error) => {
  // listting to event
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
