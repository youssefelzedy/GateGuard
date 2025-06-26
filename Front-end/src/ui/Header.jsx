import { Sun, Moon } from "lucide-react";
import { useAdmin } from "../features/auth/useAdmin";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { MapPinIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";

const VITE_API_URL_PICTURE = import.meta.env.VITE_API_URL_PICTURE;

function Header() {
    const { admin } = useAdmin();
    const navigate = useNavigate();
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <header className="flex items-center justify-between bg-primary-50 px-6 py-3 shadow-sm transition-colors duration-300 dark:bg-gray-800">
            <div>
                <div className="mb-1 flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
                        {admin?.garage?.garageName || "Dashboard"}
                    </h1>
                    <div className="flex items-center gap-1">
                        <MapPinIcon className="h-5 w-5 text-primary-500 dark:text-primary-300" />
                        <span className="text-base text-primary-700 dark:text-primary-200">
                            {admin?.garage?.location}
                        </span>
                    </div>
                </div>
                <p className="text-base text-primary-900/50 dark:text-primary-100/50">
                    Hi, {admin?.name}
                </p>
            </div>

            <div className="flex items-center divide-x-2 divide-primary-200 dark:divide-gray-700">
                <div className="flex items-center gap-4 pr-3">
                    <button
                        onClick={() => navigate("/profile")}
                        className="h-12 w-12 overflow-hidden rounded-full bg-gray-200 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-blue-400"
                    >
                        <img
                            src={
                                admin?.image
                                    ? `${VITE_API_URL_PICTURE}/${admin.image}`
                                    : "default.jpg"
                            }
                            alt="Profile"
                            className="w h-full object-cover"
                        />
                    </button>
                    <div className="hidden md:block">
                        <p className="text-base font-semibold text-primary-900 dark:text-primary-100">
                            {admin?.name}
                        </p>
                        <p className="text-sm text-primary-900/50 dark:text-primary-100/50">
                            {admin?.role}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 pl-3">
                    <button
                        onClick={toggleDarkMode}
                        className="rounded-full p-2 transition-colors hover:bg-primary-200 dark:hover:bg-gray-700"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5 text-primary-900 dark:text-primary-100" />
                        ) : (
                            <Moon className="h-5 w-5 text-primary-900 dark:text-primary-100" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
