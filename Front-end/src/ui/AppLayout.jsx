import { Navigate, Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAdmin } from "../features/auth/useAdmin";
import toast from "react-hot-toast";

function AppLayout() {
    const { isAuth } = useAdmin();
    if (!isAuth) {
        toast.error("You need to be logged in to access this page");
        return <Navigate to="/login" replace />;
    }
    return (
        <div className="flex min-h-screen bg-primary-100">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Header />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
