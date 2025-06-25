import { Navigate } from "react-router";
import HeaderLogin from "../features/auth/HeaderLogin";
import LoginForm from "../features/auth/LoginForm";
import { useAdmin } from "../features/auth/useAdmin";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

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
        return (
            <div className="flex h-screen items-center justify-center bg-primary-100">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="w-52 object-contain sm:w-48 md:w-60 lg:w-72 xl:w-96"
                    src="/Loading_Animation_3_clip.webm"
                />
            </div>
        );
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
