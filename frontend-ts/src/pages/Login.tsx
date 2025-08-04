import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { useAdmin } from "../features/auth/useAdmin";
import HeaderLogin from "../features/auth/HeaderLogin";
import LoginForm from "../features/auth/LoginForm";
import FullScreenLoader from "../ui/FullScreenLoader";

function Login() {
    const { isAuth } = useAdmin();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <FullScreenLoader />;
    }

    if (isAuth) {
        toast.success("You are already logged in.");
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
            <HeaderLogin />
            <LoginForm />
        </div>
    );
}

export default Login;
