import { BellRing, Mail, LogOut } from "lucide-react";
import { useAdmin } from "../features/auth/useAdmin";
import { useNavigate } from "react-router-dom";

function Header() {
    const { admin } = useAdmin();
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between bg-primary-50 px-6 py-3 shadow-sm">
            <div>
                <h1 className="text-xl font-bold text-primary-900">
                    {admin?.garage?.garageName || "Dashboard"}
                </h1>
                <p className="text-base text-primary-900/50">
                    Hi, {admin?.name}
                </p>
            </div>

            <div className="flex items-center divide-x-2 divide-primary-200">
                <div className="flex items-center gap-4 pr-3">
                    <button
                        onClick={() => navigate("/profile")}
                        className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <img
                            src={admin?.image || "default.jpg"}
                            alt="Profile"
                            className="h-full w-full object-cover"
                        />
                    </button>
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-primary-900">
                            {admin?.name}
                        </p>
                        <p className="text-xs text-primary-900/50">
                            {admin?.role}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
