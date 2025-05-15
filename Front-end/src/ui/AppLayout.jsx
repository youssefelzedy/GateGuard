import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useAdmin } from "../features/auth/useAdmin";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
    const { isAuth, logout } = useAdmin();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex min-h-screen bg-primary-100">
            <Sidebar onLogoutClick={() => setShowLogoutModal(true)} />
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-lg font-semibold text-primary-900">
                            Are you sure you want to log out?
                        </h2>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                className="rounded-md bg-red-500 px-4 py-2 text-white"
                                onClick={() => {
                                    logout();
                                    setShowLogoutModal(false);
                                }}
                            >
                                Yes
                            </button>
                            <button
                                className="rounded-md bg-gray-300 px-4 py-2"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AppLayout;
