import { useState } from "react";

function LandingHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="relative flex items-center justify-between bg-transparent px-4 py-4 lg:px-10 lg:py-6">
            <div className="mx-2 flex items-center lg:mx-4">
                <img
                    src="/Logo_light.svg"
                    alt="Logo"
                    className="h-12 w-auto bg-transparent lg:h-14"
                />
            </div>

            {/* Desktop Nav - Now only visible from 1024px (lg) and above */}
            <nav className="mx-2 hidden gap-8 lg:flex lg:gap-10">
                <a
                    href="#features"
                    className="text-base font-semibold text-primary-50 transition-colors hover:text-primary-600 lg:text-lg"
                >
                    Features
                </a>
                <a
                    href="#about"
                    className="text-base font-semibold text-primary-50 transition-colors hover:text-primary-600 lg:text-lg"
                >
                    About
                </a>
                <a
                    href="#contact"
                    className="text-base font-semibold text-primary-50 transition-colors hover:text-primary-600 lg:text-lg"
                >
                    Contact
                </a>
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden items-center gap-4 lg:flex lg:gap-6">
                <a
                    href="/login"
                    className="inline-flex h-10 w-20 items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-base font-semibold text-primary-50 shadow-md transition-all hover:bg-primary-400 hover:shadow-lg active:scale-95 lg:w-24"
                >
                    Log in
                </a>
                <a
                    href="/get-started"
                    className="inline-flex h-10 w-28 items-center justify-center rounded-lg border-2 border-primary-50 px-4 py-2 text-base font-semibold text-primary-50 shadow-md transition-all hover:bg-primary-50 hover:text-primary-700 hover:shadow-lg active:scale-95 lg:w-32"
                >
                    Get Started
                </a>
            </div>

            {/* Mobile Menu Icon - Now visible below lg (1024px) */}
            <button
                className="flex items-center rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 lg:hidden"
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

            {/* Mobile Drawer - Only shown below lg */}
            {menuOpen && (
                <div className="fixed inset-0 z-40 flex justify-end bg-black bg-opacity-60 transition-all lg:hidden">
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
