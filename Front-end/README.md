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

## 📁 Folder Structure

```
src/
  assets/         # Images, videos, and static files
  components/     # Reusable UI components (Dashboard, Tables, etc.)
  context/        # React context providers (e.g., DarkMode)
  features/       # Feature modules (LandingPage, logsPage, users, admins, auth, garages, LiveStream)
  hooks/          # Custom React hooks
  pages/          # Main app pages (Dashboard, LandingPage, Logs, Users, Admins, etc.)
  services/       # API and service logic
  ui/             # Layout and UI primitives (Header, Sidebar, AppLayout, etc.)
  utils/          # Utility functions and constants
  main.jsx        # App entry point
  main.css        # Global styles
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
