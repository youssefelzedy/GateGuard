import {
    LayoutDashboard,
    FileText,
    Video,
    Users,
    ShieldUser,
    LogOut,
} from "lucide-react";
import { NavLink } from "react-router";
import { useAdmin } from "../features/auth/useAdmin";

const sidebarItems = [
    {
        to: "/dashboard",
        icon: <LayoutDashboard size={20} />,
        label: "Overview",
    },
    {
        to: "/logs",
        icon: <FileText size={20} />,
        label: "Logs",
    },
    {
        to: "/live-stream",
        icon: <Video size={20} />,
        label: "Live Stream",
    },
    {
        to: "/users",
        icon: <Users size={20} />,
        label: "Users",
    },
];

function Sidebar({ onLogoutClick }) {
    const { isOwner } = useAdmin();
    return (
        <aside className="sticky top-0 flex h-screen w-60 flex-col justify-center bg-primary-50 transition-all duration-300">
            <div className="flex items-center justify-center p-10">
                <img
                    src="/Logo_shield.svg"
                    alt="Logo"
                    className="h-auto w-auto bg-transparent"
                />
            </div>
            <nav className="flex flex-1 flex-col justify-between py-8">
                <ul className="space-y-2 px-4">
                    {sidebarItems.map((item) => (
                        <NavItem
                            key={item.to}
                            to={item.to}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}
                    {isOwner && (
                        <NavItem
                            to="/Admins"
                            icon={<ShieldUser size={20} />}
                            label="Admins"
                        />
                    )}
                </ul>
                <div className="flex items-center justify-center gap-4 p-4">
                    <button
                        className="relative flex gap-2 rounded bg-primary-800 px-4 py-2 font-bold text-white"
                        onClick={onLogoutClick}
                    >
                        <span className="text-sm font-medium">Logout</span>
                        <LogOut size={20} />
                    </button>
                </div>
            </nav>
        </aside>
    );
}

function NavItem({ to, icon, label }) {
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center gap-4 p-3 text-xl font-medium ${
                        isActive
                            ? "rounded-2xl bg-primary-400/40 text-primary-900"
                            : "rounded-3xl text-primary-900 hover:bg-primary-400/30"
                    }`
                }
            >
                <span>{icon}</span>
                <span>{label}</span>
            </NavLink>
        </li>
    );
}

export default Sidebar;
