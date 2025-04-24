function LandingHeader() {
    return (
        <header className="bg-transparentpx-6 flex flex-row items-center justify-between py-4 shadow-sm">
            <div className="flex items-center">
                <img
                    src="/Logo_shield.svg"
                    alt="Logo"
                    className="h-12 w-auto bg-transparent"
                />
            </div>

            <nav className="hidden space-x-6 md:flex">
                <a
                    href="#features"
                    className="text-gray-700 transition-colors hover:text-blue-600"
                >
                    Features
                </a>
                <a
                    href="#about"
                    className="text-gray-700 transition-colors hover:text-blue-600"
                >
                    About
                </a>
                <a
                    href="#contact"
                    className="text-gray-700 transition-colors hover:text-blue-600"
                >
                    Contact
                </a>
            </nav>

            <div className="flex items-center space-x-4">
                <a
                    href="/login"
                    className="rounded px-4 py-2 font-medium text-blue-600 transition-colors hover:bg-blue-50"
                >
                    Login
                </a>
                <a
                    href="/register"
                    className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                >
                    Sign Up
                </a>
            </div>
        </header>
    );
}

export default LandingHeader;
