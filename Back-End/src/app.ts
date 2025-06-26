import { NextFunction, Request, Response } from 'express';
import customRequest from './interfaces/customRequest';
import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xssClean from 'xss-clean';
import cors, { CorsOptions } from 'cors';
import fs from 'fs';
import path from 'path';
import { getUploadPath } from './utils/fileUpload';
import {
  getUploadConfig,
  ensureUploadDirectories,
} from './config/uploadConfig';

import AppError from './utils/appError';
import globalErrorhandler from './utils/errorHandler';
import adminRouter from './routes/adminRoutes';
import garageRouter from './routes/garageRoutes';
import userRouter from './routes/userRoutes';
import logsRouter from './routes/logsRoutes';
import authRouter from './routes/authRoutes';
import invitationRouter from './routes/invitationRoutes';
import cameraRouter from './routes/cameraRoutes';
import logsController from './controllers/logsController';

const app = express();

// Ensure the upload directory exists and serve static files
ensureUploadDirectories();
const uploadConfig = getUploadConfig();
app.use(express.static(uploadConfig.basePath));

// 1) GLOBAL MIDDLEWARES
// Enable CORS for all routes
const allowedOrigins: string[] = [
  'http://localhost:5173',
  'http://127.0.0.1/5173',
  'https://gateguard.me',
];

// Configure CORS options
const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Enable CORS with the specified options
app.use(cors(corsOptions));
// Handle preflight requests
// app.options('*', cors());

//Set Security - HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // You may need to configure this based on your needs
    crossOriginEmbedderPolicy: false, // Might be needed for certain iframe scenarios
  }),
);

app.use(morgan('dev'));
//Development logging

// Limit request from same IP
const limiter = rateLimit({
  max: 250,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, Please try again in an hour!',
});

app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // middleware

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xssClean());

// Routes
const API = '/api/v1';
app.use(`${API}/admins`, adminRouter);
app.use(`${API}/auth`, authRouter);
app.use(`${API}/garages`, garageRouter);
app.use(`${API}/invitations`, invitationRouter);
app.use(`${API}/users`, userRouter);
app.use(`${API}/logs`, logsRouter);
app.use(`${API}/cameras`, cameraRouter);

// Hardware-specific routes (accessible without garage nesting)
app.get(
  `${API}/hardware/check-latest`,
  logsController.checkLatestLogForHardware,
);
app.post(`${API}/hardware/mark-processed`, logsController.markLogAsProcessed);

app.all('*', (req: customRequest, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorhandler);

export default app;
