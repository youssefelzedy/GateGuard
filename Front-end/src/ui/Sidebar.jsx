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
        <aside className="h-screen sticky top-0 transition-all duration-300 flex flex-col justify-center">
            <div className="p-4 flex items-center justify-center w-40">
                <img
                    src="/Logo_shield.svg"
                    alt="Logo"
                    className="h-auto w-auto bg-transparent"
                />
            </div>

            <nav className="flex-1 py-8">
                <ul className="space-y-2 px-3">
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
                    `flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive
                            ? "bg-[#DBE2EF80] text-xl font-bold text-[#112D4E]"
                            : "text-[#112D4E] text-xl font-bold hover:bg-[#DBE2EF80]"
                    }`
                }>
                <span>{icon}</span>
                <span>{label}</span>
            </NavLink>
        </li>
    );
}

export default Sidebar;
