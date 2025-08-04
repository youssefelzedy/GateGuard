import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "./useLogin";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login, isPending } = useLogin();
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(
            { email, password },
            {
                onSuccess: () => {
                    setEmail("");
                    setPassword("");
                    setShowPassword(false);
                },
                onSettled: () => {
                    setPassword("");
                    setShowPassword(false);
                },
            }
        );
    };

    return (
        <div className="relative w-full max-w-md animate-fadeSlideUp overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-500">
            <div className="mb-6 text-center transition-all delay-100 duration-700">
                <h1 className="inline-block animate-fadeSlideUp bg-gradient-to-r from-primary-800 to-primary-500 bg-clip-text text-2xl font-bold text-primary-900">
                    Welcome to Gate Guard
                </h1>
            </div>

            <div className="-z-1 absolute -bottom-7 -right-4 animate-float opacity-25 transition-opacity duration-700">
                <img
                    src="/Shield.svg"
                    alt="Logo"
                    className="h-auto w-auto transition-opacity duration-700"
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div
                    className="animate-fadeSlideUp"
                    style={{ animationDelay: "200ms" }}>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full transform rounded-md border border-primary-200 bg-primary-50 px-4 py-3 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        required
                        disabled={isPending}
                    />
                </div>

                <div
                    className="relative animate-fadeSlideUp"
                    style={{ animationDelay: "300ms" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full transform rounded-md border border-primary-200 bg-primary-50 px-4 py-3 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        required
                        disabled={isPending}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500 transition-all duration-300 hover:text-primary-700"
                        disabled={isPending}>
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className={`relative w-full animate-fadeSlideUp rounded-md bg-primary-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 ${
                        isPending ? "animate-pulse" : ""
                    }`}
                    style={{ animationDelay: "400ms" }}>
                    {isPending ? "Logging in..." : "Login"}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-primary-600">
                    Don't have an account?
                    <Link
                        to={"/get-started"}
                        className="group relative ml-1 font-medium text-primary-600 transition-colors duration-200 hover:text-primary-800">
                        Register
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
