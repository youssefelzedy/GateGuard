import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

function RegistrationForm() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agree, setAgree] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => setIsSubmitting(false), 1500);
    };

    const inputClass =
        "w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

    const containerClass = `relative w-full max-w-md overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-500 ${
        isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`;

    return (
        <div className={containerClass}>
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-slate-800">
                    Welcome to Gate Guard
                </h1>
            </div>

            <div className="animate-float -z-1 absolute -left-5 -top-2 opacity-25">
                <img
                    src="/Shield.svg"
                    alt="Logo"
                    className={`h-auto w-auto transition-opacity duration-700 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="User Name"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className={inputClass}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    required
                    disabled={isSubmitting}
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass}
                        required
                        disabled={isSubmitting}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        disabled={isSubmitting}
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass}
                        required
                        disabled={isSubmitting}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        disabled={isSubmitting}
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>

                <div className="flex items-center text-sm text-slate-600">
                    <input
                        type="checkbox"
                        checked={agree}
                        onChange={() => setAgree(!agree)}
                        className="mr-2"
                        required
                    />
                    By proceeding, you agree to the{" "}
                    <a href="#" className="ml-1 text-blue-600 underline">
                        Terms and Conditions
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full rounded-md bg-[#0F2543] px-4 py-3 font-medium text-white transition-all hover:bg-[#0c1e36] ${
                        isSubmitting ? "animate-pulse" : ""
                    }`}
                >
                    {isSubmitting ? "Processing..." : "Register"}
                </button>
            </form>

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

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

export default RegistrationForm;
