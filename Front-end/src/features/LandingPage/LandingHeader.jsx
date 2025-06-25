import { useState } from "react";

function LandingHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="relative flex items-center justify-between bg-transparent px-4 py-4 md:px-10 md:py-6">
            <div className="mx-2 flex items-center md:mx-4">
                <img
                    src="/Logo_light.svg"
                    alt="Logo"
                    className="h-12 w-auto bg-transparent md:h-14"
                />
            </div>
            {/* Desktop Nav */}
            <nav className="mx-2 hidden gap-8 md:flex md:gap-10">
                <a
                    href="#features"
                    className="text-base font-semibold text-primary-50 transition-colors hover:text-primary-600 md:text-lg"
                >
                    Features
                </a>
                <a
                    href="#about"
                    className="text-base font-semibold text-primary-50 transition-colors hover:text-primary-600 md:text-lg"
                >
                    About
                </a>
                <a
                    href="#contact"
                    className="text-base font-semibold text-primary-50 transition-colors hover:text-primary-600 md:text-lg"
                >
                    Contact
                </a>
            </nav>
            {/* Desktop Buttons */}
            <div className="hidden items-center gap-4 md:flex md:gap-6">
                <a
                    href="/login"
                    className="inline-flex h-10 w-20 items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-base font-semibold text-primary-50 shadow-md transition-all hover:bg-primary-400 hover:shadow-lg active:scale-95 md:w-24"
                >
                    Log in
                </a>
                <a
                    href="/get-started"
                    className="inline-flex h-10 w-28 items-center justify-center rounded-lg border-2 border-primary-50 px-4 py-2 text-base font-semibold text-primary-50 shadow-md transition-all hover:bg-primary-50 hover:text-primary-700 hover:shadow-lg active:scale-95 md:w-32"
                >
                    Get Started
                </a>
            </div>
            {/* Mobile Menu Icon */}
            <button
                className="flex items-center rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open menu"
            >
                <svg
                    className="h-8 w-8 text-primary-50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={
                            menuOpen
                                ? "M6 18L18 6M6 6l12 12"
                                : "M4 6h16M4 12h16M4 18h16"
                        }
                    />
                </svg>
            </button>
            {/* Mobile Menu Drawer */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 flex justify-end bg-black bg-opacity-60 transition-all md:hidden">
                    <div className="animate-slide-in flex h-full w-3/4 max-w-xs flex-col gap-6 bg-primary-900 p-6 shadow-lg">
                        <button
                            className="mb-2 self-end"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg
                                className="h-7 w-7 text-primary-50"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <a
                            href="#features"
                            className="rounded px-2 py-2 text-lg font-semibold text-primary-50 transition-colors hover:bg-primary-700"
                            onClick={() => setMenuOpen(false)}
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="rounded px-2 py-2 text-lg font-semibold text-primary-50 transition-colors hover:bg-primary-700"
                            onClick={() => setMenuOpen(false)}
                        >
                            About
                        </a>
                        <a
                            href="#contact"
                            className="rounded px-2 py-2 text-lg font-semibold text-primary-50 transition-colors hover:bg-primary-700"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </a>
                        <a
                            href="/login"
                            className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-base font-semibold text-primary-50 shadow-md transition-all hover:bg-primary-400 hover:shadow-lg active:scale-95"
                            onClick={() => setMenuOpen(false)}
                        >
                            Log in
                        </a>
                        <a
                            href="/get-started"
                            className="inline-flex h-10 w-full items-center justify-center rounded-lg border-2 border-primary-50 px-4 py-2 text-base font-semibold text-primary-50 shadow-md transition-all hover:bg-primary-50 hover:text-primary-700 hover:shadow-lg active:scale-95"
                            onClick={() => setMenuOpen(false)}
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
