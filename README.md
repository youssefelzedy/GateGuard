# GateGuard

A modern, automated gate and garage access management system for organizations. GateGuard streamlines vehicle and user registration, approval, and monitoring with real-time analytics and robust security. The project consists of a robust backend (Node.js, Express, MongoDB) and a fast, beautiful frontend (React, Vite, Tailwind CSS).

---

## 🚀 Features

-   **Automated Registration & Approval:** Employees and vehicle owners register; admins review and approve access.
-   **Live Stream Monitoring:** Real-time video feeds from garage gates and cameras.
-   **Access Logs:** Searchable, filterable, and paginated logs of all entries and exits.
-   **Role-Based Management:** Admin and user management with invitation flows.
-   **Dashboard Analytics:** Visualize entries, trends, and car counts with interactive charts.
-   **Gate Control:** Open/close the garage gate directly from the dashboard.
-   **Profile & Settings:** Manage personal and garage information.
-   **Dark Mode:** Seamless light/dark theme support.
-   **Responsive UI:** Works beautifully on all devices.
-   **Secure REST API:** Authentication, authorization, and data validation.
-   **Email Notifications:** For invitations and approvals.

---

## 🏁 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18+ recommended)
-   [MongoDB](https://www.mongodb.com/) (local or cloud instance)
-   npm (comes with Node.js)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gateguard.git
cd gateguard
```

---

### 2. Backend Setup

```bash
cd Back-End
cp config.env.example config.env   # Edit config.env with your MongoDB URI and secrets
npm install
npm start
```

-   The backend will start on the port specified in your `config.env` (default: 5000).

---

### 3. Frontend Setup

Open a new terminal:

```bash
cd Front-end
npm install
npm run dev
```

-   The frontend will start on [http://localhost:5173](http://localhost:5173).

---

## 🧰 Tech Stack

### Frontend

-   **Framework:** [React](https://react.dev/) (with Vite)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Routing:** [react-router-dom](https://reactrouter.com/)
-   **State/Data:** [@tanstack/react-query](https://tanstack.com/query/latest)
-   **Form Handling:** [react-hook-form](https://react-hook-form.com/)
-   **Charts:** [Recharts](https://recharts.org/)
-   **UI/UX:** [Framer Motion](https://www.framer.com/motion/), [PrimeReact](https://primereact.org/), [Lucide React Icons](https://lucide.dev/)
-   **Notifications:** [react-hot-toast](https://react-hot-toast.com/)

### Backend

-   **Runtime:** [Node.js](https://nodejs.org/)
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) (with Mongoose)
-   **Authentication:** JWT, bcryptjs
-   **Email:** Nodemailer
-   **Security:** Helmet, CORS, express-rate-limit, xss-clean, express-mongo-sanitize, hpp
-   **WebSockets:** ws (for live features)
-   **Video Processing:** fluent-ffmpeg
-   **Validation:** validator

---

## 📁 Folder Structure

### Root

```
/
├── Back-End/      # Backend API and server
├── Front-end/     # Frontend React app
├── LICENSE
└── README.md
```

### Backend (`Back-End/`)

```
Back-End/
│
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers (business logic)
│   ├── interfaces/     # TypeScript interfaces
│   ├── models/         # Mongoose models (data schemas)
│   ├── routes/         # Express route definitions
│   ├── types/          # Custom TypeScript types
│   ├── utils/          # Utility functions (error handling, email, file upload, etc.)
│   ├── app.ts          # Express app setup
│   ├── server.ts       # Server entry point
│   └── wsServer.ts     # WebSocket server
├── config.env          # Environment variables
├── package.json
└── tsconfig.json
```

### Frontend (`Front-end/`)

```
Front-end/
│
├── src/
│   ├── assets/         # Images, videos, SVGs, etc.
│   ├── components/     # Reusable UI components
│   ├── context/        # React context providers
│   ├── features/       # Feature-based modules (domain logic/UI)
│   ├── pages/          # Top-level routed pages
│   ├── services/       # API and service logic
│   ├── ui/             # Layout and UI primitives
│   ├── utils/          # Utility functions and constants
│   ├── main.jsx        # App entry point
│   └── main.css        # Global styles
├── index.html
├── package.json
└── vite.config.js
```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👤 Contact / Author Info

**Frontend:**

-   Salah Swefy – [salahm.swefy@gmail.com](mailto:salahm.swefy@gmail.com) – [GitHub: SalahMSwefy](https://github.com/SalahMSwefy)

-   Saad Samir – [saadsamir7177@gmail.com](mailto:saadsamir7177@gmail.com) – [GitHub: SaadSamir7](https://github.com/SaadSamir7)

**Backend:**

-   Youssef Megahed – [youssefmegahed99n@gmail.com](mailto:youssefmegahed99n@gmail.com) – [GitHub: YoussefMegahed](https://github.com/YoussefMegahed)

-   Youssef Elzedy – [youssefelzedy90@gmail.com](mailto:youssefmegahed99n@gmail.com) – [GitHub: youssefelzedy](https://github.com/youssefelzedy)

---

> \_GateGuard – Secure, automate, and monitor your garage access with ease.
