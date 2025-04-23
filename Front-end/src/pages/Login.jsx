import HeaderLogin from "../features/auth/HeaderLogin";
import LoginForm from "../features/auth/LoginForm";

function Login() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
            <HeaderLogin />
            <LoginForm />
        </div>
    );
}

export default Login;
