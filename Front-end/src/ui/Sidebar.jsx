import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Video, Users } from "lucide-react";

function Sidebar() {
  return (
    <aside
      className={`bg-[#F9F7F7] text-Dark Blue h-screen sticky top-0 transition-all duration-300
      } flex flex-col`}
    >
      <div className="p-4 flex items-center ">
        <div className=" p-2 rounded-lg">
          <img
            src="/Shield.svg"
            alt="Gate Guard Logo"
            className="w-45px h-60px"
          />
        </div>
        <div>
          <h1 className="font-bold text-3xl text-[#112D4E]">Gate</h1>
          <h1 className="font-bold text-3xl text-[#112D4E]">Guard</h1>
        </div>
      </div>

      <nav className="flex-1 py-8">
        <ul className="space-y-2 px-3">
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Overview"
          />
          <NavItem to="/logs" icon={<FileText size={20} />} label="Logs" />
          <NavItem
            to="/live-stream"
            icon={<Video size={20} />}
            label="Live Stream"
          />
          <NavItem to="/users" icon={<Users size={20} />} label="Users" />
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-800">
        <div className="bg-[#DBE2EF80] bg-opacity-50 rounded-lg p-10 text-sm">
          <p className="text-[#112D4E] text-2xl font-bold">Need help?</p>
          <p className="text-base text-[#112D4E] mb-4">
            Reach out to our support team
          </p>
          <button className="bg-[#112D4E] hover:bg-[#112D4E] text-white font-bold text-base py-1.5 px-1.5 rounded-md w-full">
            Contact us
          </button>
        </div>
      </div>
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
        }
      >
        <span>{icon}</span>
        <span>{label}</span>
      </NavLink>
    </li>
  );
}

export default Sidebar;
