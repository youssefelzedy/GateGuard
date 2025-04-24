const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorhandler = require('./controllers/errorController');
const adminRouter = require('./routes/adminRoutes');
const garageRouter = require('./routes/garageRoutes');
const userRouter = require('./routes/userRoutes');
const logsRouter = require('./routes/logsRoutes');
const authRouter = require('./routes/authRoutes');
const invitationRouter = require('./routes/invitationRoutes');

const app = express();

//1) GLOBAL MIDDLEWARES
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//Set Security - HTTP Headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // this is called logger
}

// Limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, Please try again in an hour!',
});

app.use(
  cors({
    origin: '*', // Allow your front-end origin
    methods: ['*'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
  }),
);

app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // middleware

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price',
//     ],
//   }),
// );

// Serving static files

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//3) Routes
// app.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'Dahab',
//     user: 'Youssef',
//   });
// });

const API = '/api/v1';
app.use(`${API}/admins`, adminRouter);
app.use(`${API}/auth`, authRouter);
app.use(`${API}/garages`, garageRouter);
app.use(`${API}/invitations`, invitationRouter);
// app.use(`${API}/users`, userRouter);
// app.use(`${API}/logs`, logsRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorhandler);

module.exports = app;
