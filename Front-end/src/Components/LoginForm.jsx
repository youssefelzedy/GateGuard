import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import HeaderLogin from "../Components/HeaderLogin";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => setIsSubmitting(false), 1500);
    };

    return (
        <div
            className={`relative w-full max-w-md overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-500 ${
                isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
            }`}
        >
            <div className="mb-6 text-center transition-all delay-100 duration-700">
                <h1 className="inline-block bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-2xl font-bold text-slate-800">
                    Welcome to Gate Guard
                </h1>
            </div>

            <div className="-z-1 animate-float absolute -bottom-7 -right-4 opacity-25 transition-opacity duration-700">
                <img
                    src="/Shield.svg"
                    alt="Logo"
                    className={`h-auto w-auto transition-opacity duration-700 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="animate-in" style={{ animationDelay: "200ms" }}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full transform rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div
                    className="animate-in relative"
                    style={{ animationDelay: "300ms" }}
                >
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full transform rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        required
                        disabled={isSubmitting}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-all duration-300 hover:text-slate-700"
                        disabled={isSubmitting}
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`animate-in relative w-full rounded-md bg-[#0F2543] px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-[#0c1e36] focus:ring-4 focus:ring-blue-200 ${
                        isSubmitting ? "animate-pulse" : ""
                    }`}
                    style={{ animationDelay: "400ms" }}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="-ml-1 mr-3 h-5 w-5 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>

            <div
                className="animate-in mt-6 text-center"
                style={{ animationDelay: "500ms" }}
            >
                <p className="text-sm text-slate-600">
                    Don't have an account?
                    <a
                        href="#"
                        className="group relative ml-1 font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
                    >
                        Register
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </p>
            </div>

            <style jsx>{`
                @keyframes fadeSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-10px) rotate(2deg);
                    }
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                }

                .animate-in {
                    opacity: 0;
                    animation: fadeSlideUp 0.6s ease forwards;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export default LoginForm;
