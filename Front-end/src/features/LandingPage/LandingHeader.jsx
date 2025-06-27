import { useState } from "react";
import Logo from "../../assets/Logo_light.svg";

function LandingHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="py-5">
            <nav className="flex items-center justify-between">
                <a href="/">
                    <img
                        src={Logo}
                        alt="GateGuard Logo"
                        className="h-14 w-auto"
                    />
                </a>
                <ul className="hidden items-center space-x-8 md:flex">
                    <li>
                        <a
                            href="#features"
                            className="text-lg font-medium text-white transition-colors hover:text-primary-300"
                        >
                            Features
                        </a>
                    </li>
                    <li>
                        <a
                            href="#about"
                            className="text-lg font-medium text-white transition-colors hover:text-primary-300"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className="text-lg font-medium text-white transition-colors hover:text-primary-300"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
                <div className="hidden items-center space-x-4 md:flex">
                    <a
                        href="/login"
                        className="rounded-md px-5 py-2 text-lg font-medium text-white transition-colors hover:bg-white/10"
                    >
                        Log in
                    </a>
                    <a
                        href="/get-started"
                        className="rounded-md bg-white px-5 py-2 text-lg font-medium text-primary-700 shadow-sm transition-colors hover:bg-primary-100"
                    >
                        Get Started
                    </a>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg
                            className="h-8 w-8 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    isMenuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16m-7 6h7"
                                }
                            ></path>
                        </svg>
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="mt-4 rounded-md bg-white p-4 shadow-lg md:hidden">
                    <ul className="space-y-4">
                        <li>
                            <a
                                href="#features"
                                className="block text-lg font-medium text-gray-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Features
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className="block text-lg font-medium text-gray-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="block text-lg font-medium text-gray-700"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                    <div className="mt-6 border-t pt-6">
                        <a
                            href="/login"
                            className="block w-full rounded-md py-2 text-center text-lg font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Log in
                        </a>
                        <a
                            href="/get-started"
                            className="mt-2 block w-full rounded-md bg-primary-600 py-2 text-center text-lg font-medium text-white shadow-sm hover:bg-primary-700"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}

export default LandingHeader;
