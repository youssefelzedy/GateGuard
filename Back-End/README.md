# GateGuard Backend API

A robust, secure REST API for the GateGuard garage access management system. Built with Node.js, Express, TypeScript, and MongoDB, providing comprehensive endpoints for user management, access control, live monitoring, and real-time data processing.

---

## 🚀 Features

- **Secure Authentication & Authorization:** JWT-based authentication with role-based access control
- **User & Admin Management:** Complete CRUD operations for users and administrators
- **Garage & Camera Management:** Multi-garage support with camera integration
- **Access Logging:** Comprehensive logging system for all entry/exit events
- **Real-time Communication:** WebSocket support for live data streaming
- **File Upload System:** Secure image and file upload handling
- **Email Notifications:** Automated email system for invitations and alerts
- **Security Middleware:** Rate limiting, CORS, XSS protection, and data sanitization
- **Error Handling:** Global error handling with custom error responses
- **TypeScript Support:** Full type safety and IntelliSense support

---

## 🏗️ Architecture

```
Back-End/
├── src/
│   ├── config/         # Configuration files (database, upload)
│   ├── controllers/    # Business logic and request handlers
│   ├── interfaces/     # TypeScript interfaces and types
│   ├── models/         # Mongoose schemas and models
│   ├── routes/         # Express route definitions
│   ├── types/          # Custom TypeScript type definitions
│   ├── utils/          # Utility functions and helpers
│   ├── app.ts          # Express app configuration
│   ├── server.ts       # HTTP server and WebSocket setup
│   └── wsServer.ts     # WebSocket server implementation
├── config.env          # Environment variables
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

---

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/) (v18+)
- **Framework:** [Express.js](https://expressjs.com/) with TypeScript
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** [JWT](https://jwt.io/) with [bcryptjs](https://github.com/dcodeIO/bcrypt.js/)
- **Real-time:** [WebSocket](https://websockets.readthedocs.io/) (ws)
- **Email:** [Nodemailer](https://nodemailer.com/)
- **File Processing:** [Multer](https://github.com/expressjs/multer) + [fluent-ffmpeg](https://ffmpeg.org/)
- **Security:** [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- **Validation:** [validator](https://github.com/validatorjs/validator.js)
- **Development:** [TypeScript](https://www.typescriptlang.org/), [Nodemon](https://nodemon.io/), [ESLint](https://eslint.org/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository and navigate to backend:**

   ```bash
   cd Back-End
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp config.env.example config.env
   # Edit config.env with your configuration
   ```

### Running the Application

#### Development Mode

```bash
npm start
```

#### Production Mode

```bash
npm run build
npm run start:prod
```

#### Debug Mode

```bash
npm run debug
```

The server will start on the port specified in your `config.env` (default: 5174).

---

## 📡 API Endpoints

### Authentication (`/api/v1/auth`)

- `POST /signupAndCreate` - Register new user and create garage
- `POST /login` - User login

### Admins (`/api/v1/admins`)

- `GET /` - Get all admins (Owner only)
- `GET /me` - Get current admin profile
- `GET /:id` - Get admin by ID
- `PATCH /:id` - Update admin
- `DELETE /:id` - Delete admin (Owner only)
- `POST /uploadImage` - Upload admin profile image
- `GET /image/:filename` - Get admin image

### Users (`/api/v1/users`)

- `GET /` - Get all users
- `GET /:id` - Get user by ID
- `PATCH /:id` - Update user
- `DELETE /:id` - Delete user

### Garages (`/api/v1/garages`)

- `GET /` - Get all garages
- `GET /:id` - Get garage by ID
- `PATCH /:id` - Update garage
- `DELETE /:id` - Delete garage

### Cameras (`/api/v1/cameras`)

- `GET /` - Get all cameras
- `GET /:id` - Get camera by ID
- `POST /` - Create new camera
- `PATCH /:id` - Update camera
- `DELETE /:id` - Delete camera

### Logs (`/api/v1/logs`)

- `GET /` - Get all access logs
- `GET /:id` - Get log by ID
- `POST /` - Create new log entry

### Invitations (`/api/v1/invitations`)

- `GET /` - Get all invitations
- `POST /` - Create new invitation
- `PATCH /:id` - Update invitation status

### Hardware Integration (`/api/v1/hardware`)

- `GET /check-latest` - Check latest log for hardware
- `POST /mark-processed` - Mark log as processed

---

## 🔐 Security Features

### Authentication & Authorization

- JWT-based authentication with configurable expiration
- Role-based access control (Owner, Admin, User)
- Password hashing with bcryptjs
- Protected routes with middleware

### Security Middleware

- **Helmet:** Security headers
- **CORS:** Cross-origin resource sharing
- **Rate Limiting:** 1000 requests per hour per IP
- **XSS Protection:** Data sanitization
- **NoSQL Injection Protection:** MongoDB query sanitization
- **Request Size Limiting:** 10kb JSON payload limit

### Data Validation

- Input validation with validator.js
- TypeScript type checking
- Mongoose schema validation

---

## 📊 Database Models

### Admin Model

- Profile information (name, email, phone, image)
- Role-based permissions
- Garage associations
- Authentication data

### User Model

- Basic user information
- Vehicle details
- Access permissions
- Profile management

### Garage Model

- Garage configuration
- Camera settings
- Access rules
- Location information

### Camera Model

- Camera configuration
- Stream settings
- Hardware integration
- Status monitoring

### Log Model

- Entry/exit records
- Timestamp and location
- User and vehicle data
- Processing status

### Invitation Model

- Invitation details
- Status tracking
- Email notifications
- Expiration handling

---

## 📧 Email System

Configured email notifications for:

- User invitations
- Access approvals
- System alerts
- Password resets

**Configuration:**

- SMTP support (Gmail, Outlook, etc.)
- HTML email templates
- Attachment support
- Queue system for reliability

---

## 🧪 Development

### Scripts

```bash
npm start          # Start development server with nodemon
npm run build      # Build TypeScript to JavaScript
npm run start:prod # Start production server
npm run debug      # Start with debugger
```

### Code Quality

- **ESLint:** Code linting with Airbnb config
- **Prettier:** Code formatting
- **TypeScript:** Type checking and IntelliSense

### Environment Variables

Create a `config.env` file with the following variables:

- Database connection string
- JWT secrets
- Email configuration
- Server ports
- Environment settings

---

## 🚨 Error Handling

The API implements comprehensive error handling:

- **Global Error Handler:** Catches all unhandled errors
- **Custom Error Classes:** Specific error types
- **Validation Errors:** Detailed validation feedback
- **Database Errors:** MongoDB error handling
- **Authentication Errors:** JWT and permission errors

---

## 📈 Performance

- **Rate Limiting:** Prevents abuse
- **Database Indexing:** Optimized queries
- **Caching:** Response caching where appropriate
- **Compression:** Response compression
- **Connection Pooling:** Database connection optimization

---

## 🔧 Configuration

### Database Configuration

```typescript
// config/dbConnect.ts
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE!);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
```

### Upload Configuration

```typescript
// config/uploadConfig.ts
export const getUploadConfig = () => ({
  basePath: path.join(__dirname, '../uploads'),
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
});
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

**Backend Development:**

- **Youssef Megahed** – [youssefmegahed99n@gmail.com](mailto:youssefmegahed99n@gmail.com) – [GitHub: YoussefMegahed](https://github.com/YoussefMegahed)
- **Youssef Elzedy** – [youssefelzedy90@gmail.com](mailto:youssefelzedy90@gmail.com) – [GitHub: youssefelzedy](https://github.com/youssefelzedy)

---

> _GateGuard Backend – Secure, scalable, and robust API for modern access control systems._
