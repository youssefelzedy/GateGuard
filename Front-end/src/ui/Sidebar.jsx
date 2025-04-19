import { LayoutDashboard, FileText, Video, Users } from "lucide-react";
import { NavLink } from "react-router";

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
function Sidebar() {
    return (
        <aside className="h-screen sticky top-0 transition-all duration-300 flex flex-col justify-center w-60 bg-primary-50">
            <div className="p-10 flex items-center justify-center">
                <img
                    src="/Logo_shield.svg"
                    alt="Logo"
                    className="h-auto w-auto bg-transparent"
                />
            </div>
            <nav className="flex-1 py-8">
                <ul className="space-y-2 px-4">
                    {sidebarItems.map(item => (
                        <NavItem
                            key={item.to}
                            to={item.to}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}
                </ul>
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
                    `flex items-center gap-4 p-3 text-xl font-bold ${
                        isActive
                            ? "bg-primary-400/40 text-primary-900 rounded-2xl"
                            : "text-primary-900 hover:bg-primary-400/30 rounded-3xl"
                    }`
                }>
                <span>{icon}</span>
                <span>{label}</span>
            </NavLink>
        </li>
    );
}

export default Sidebar;
