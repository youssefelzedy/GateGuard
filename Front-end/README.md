# GateGuard

A modern, automated gate and garage access management system for organizations. GateGuard streamlines vehicle and user registration, approval, and monitoring with real-time analytics and robust security. Built with React, Vite, and Tailwind CSS for a fast, responsive, and beautiful user experience.

---

## 🚀 Features

- **Automated Registration & Approval:** Employees and vehicle owners register their details; admins review and approve access.
- **Live Stream Monitoring:** Real-time video feeds from garage gates and additional cameras.
- **Access Logs:** Searchable, filterable, and paginated logs of all entries and exits.
- **Role-Based Management:** Admin and user management with invitation flows.
- **Dashboard Analytics:** Visualize entries, trends, and car counts with interactive charts.
- **Gate Control:** Open/close the garage gate directly from the dashboard.
- **Profile & Settings:** Manage personal and garage information.
- **Dark Mode:** Seamless light/dark theme support.
- **Responsive UI:** Works beautifully on all devices.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/gateguard.git
cd gateguard/Front-end
npm install
```

### Running Locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🧰 Tech Stack

- **Framework:** [React](https://react.dev/) (with Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [react-router-dom](https://reactrouter.com/)
- **State/Data:** [@tanstack/react-query](https://tanstack.com/query/latest)
- **Charts:** [Recharts](https://recharts.org/)
- **UI/UX:** [Framer Motion](https://www.framer.com/motion/), [PrimeReact](https://primereact.org/), [Lucide React Icons](https://lucide.dev/)
- **Notifications:** [react-hot-toast](https://react-hot-toast.com/)
- **Form Handling:** [react-hook-form](https://react-hook-form.com/)
- **Other:** [HLS.js](https://github.com/video-dev/hls.js/), [Swiper](https://swiperjs.com/)

---

## 📁 Advanced Folder Structure

```
src/
│
├── assets/                           # Static assets (images, videos, SVGs, etc.)
│   ├── about/                        # About page/section images
│   ├── features/                     # Feature section images/icons
│   ├── pages/                        # Page-specific images (e.g., Dashboard)
│   ├── Slider/                       # Images for sliders/carousels
│   ├── bg.jpg                        # General background image
│   ├── Loading_Animation_3_clip.webm # Loader animation
│   ├── Logo_dark.svg                 # Dark mode logo
│   ├── Logo_light.svg                # Light mode logo
│   └── Shield.svg                    # Security/feature icon
│
├── components/                    # Reusable UI components
│   ├── Dashboard/                 # Dashboard widgets (charts, stats, etc.)
│   ├── Tables/                    # Table components (pagination, headers, etc.)
│   ├── InviteAdminForm/           # Admin invitation form components
│   └── RegisterAdminForm/         # Registration form components
│
├── context/                       # React context providers
│   └── DarkModeContext.jsx        # Dark mode state/context
│
├── features/                      # Feature-based modules (domain logic/UI)
│   ├── LandingPage/               # Landing page sections (Hero, Features, About, etc.)
│   ├── LiveStream/                # Live stream and camera management
│   ├── logsPage/                  # Access logs and log table logic
│   ├── admins/                    # Admin management (tables, headers)
│   ├── users/                     # User management (tables, headers)
│   ├── auth/                      # Authentication (login, registration, hooks)
│   └── garages/                   # Garage management logic
│
├── pages/                         # Top-level pages (routed views)
│   ├── Settings.jsx               # Garage and user settings page
│   ├── Profile.jsx                # User profile page
│   ├── Login.jsx                  # Login page
│   ├── GetStarted.jsx             # Registration onboarding page
│   ├── LandingPage.jsx            # Public landing page
│   ├── Admins.jsx                 # Admin management page
│   ├── Users.jsx                  # User management page
│   ├── Logs.jsx                   # Access logs page
│   ├── LiveStream.jsx             # Live camera stream page
│   ├── Dashboard.jsx              # Main dashboard page
│   ├── InviteUser.jsx             # User invitation page
│   └── InviteAdmin.jsx            # Admin invitation page
│
├── services/                      # API and service logic
│   ├── apiLogs.js                 # Logs API
│   ├── apiCameras.js              # Cameras API
│   ├── apiGarages.js              # Garages API
│   ├── apiAdmins.js               # Admins API
│   ├── apiUsers.js                # Users API
│   └── apiAuth.js                 # Auth API
│
├── ui/                            # Layout and UI primitives
│   ├── Sidebar.jsx                # Sidebar navigation
│   ├── Header.jsx                 # Main app header
│   ├── Plate.jsx                  # License plate UI component
│   └── AppLayout.jsx              # Main app layout wrapper
│
├── utils/                         # Utility functions and constants
│   ├── constants.js               # App-wide constants
│   └── helper.js                  # Helper functions
│
├── main.jsx                       # App entry point (React root)
└── main.css                       # Global styles (Tailwind, etc.)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Contact / Author Info

- **Author:** Your Name or Team
- **Email:** your.email@example.com
- **GitHub:** [https://github.com/your-username](https://github.com/your-username)

---

> _GateGuard – Secure, automate, and monitor your garage access with ease._
