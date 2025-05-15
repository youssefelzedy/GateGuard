import { Navigate } from "react-router";
import HeaderLogin from "../features/auth/HeaderLogin";
import LoginForm from "../features/auth/LoginForm";
import { useAdmin } from "../features/auth/useAdmin";
import toast from "react-hot-toast";

function Login() {
    const { isAuth } = useAdmin();

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
