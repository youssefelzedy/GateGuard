import {
    LayoutDashboard,
    FileText,
    Video,
    Users,
    ShieldUser,
    LogOut,
    Settings,
} from "lucide-react";
import { NavLink } from "react-router";
import { useAdmin } from "../features/auth/useAdmin";
import { useDarkMode } from "../context/DarkModeContext";

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
    const { isDarkMode } = useDarkMode();
    return (
        <aside className="sticky top-0 flex h-screen w-60 flex-col justify-center bg-primary-50 transition-all duration-300 dark:bg-gray-800">
            <div className="flex items-center justify-center p-8">
                <img
                    src={isDarkMode ? "/Logo_light.svg" : "/Logo_dark.svg"}
                    alt="Logo"
                    className="h-20 w-40 bg-transparent"
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
                <div className="flex flex-col space-y-2 px-4">
                    {isOwner && <SettingsNavItem />}
                    <LogoutNavItem onLogoutClick={onLogoutClick} />
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
                            ? "rounded-2xl bg-primary-400/40 text-primary-900 dark:bg-primary-400/20 dark:text-primary-100"
                            : "rounded-3xl text-primary-900 hover:bg-primary-400/30 dark:text-primary-100 dark:hover:bg-primary-400/10"
                    }`
                }
            >
                <span>{icon}</span>
                <span>{label}</span>
            </NavLink>
        </li>
    );
}

function SettingsNavItem() {
    return (
        <NavLink
            to="/settings"
            className={({ isActive }) =>
                `flex items-center gap-4 rounded-3xl p-3 text-xl font-medium text-primary-900 transition-colors hover:bg-primary-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:text-primary-100 dark:hover:bg-primary-400/10 ${
                    isActive ? "bg-primary-400/40 dark:bg-primary-400/20" : ""
                }`
            }
            tabIndex={0}
        >
            <span>
                <Settings size={20} />
            </span>
            <span>Settings</span>
        </NavLink>
    );
}

function LogoutNavItem({ onLogoutClick }) {
    return (
        <button
            onClick={onLogoutClick}
            className="flex w-full items-center gap-4 rounded-xl bg-primary-900 p-3 text-xl font-medium text-white transition-colors hover:bg-primary-700/80 hover:text-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-primary-800 dark:hover:bg-primary-700"
            type="button"
            tabIndex={0}
        >
            <span>
                <LogOut size={20} />
            </span>
            <span>Logout</span>
        </button>
    );
}

export default Sidebar;
