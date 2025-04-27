function LandingHeader() {
    return (
        <header className="flex items-center justify-between bg-transparent px-10 py-6">
            <div className="flex items-center">
                <img
                    src="/Logo.svg"
                    alt="Logo"
                    className="h-14 w-auto bg-transparent"
                />
            </div>

            <nav className="hidden gap-4 space-x-8 md:flex">
                <a
                    href="#features"
                    className="font-semibold text-primary-50 transition-colors hover:text-primary-600"
                >
                    Features
                </a>
                <a
                    href="#about"
                    className="font-semibold text-primary-50 transition-colors hover:text-primary-600"
                >
                    About
                </a>
                <a
                    href="#contact"
                    className="font-semibold text-primary-50 transition-colors hover:text-primary-600"
                >
                    Contact
                </a>
            </nav>

            <div className="flex items-center gap-8">
                <a
                    href="/login"
                    className="rounded bg-primary-700 px-4 py-2 font-medium text-primary-50 transition-colors hover:bg-primary-400"
                >
                    Log in
                </a>
                <a
                    href="/signup"
                    className="rounded bg-primary-700 px-4 py-2 font-medium text-primary-50 transition-colors hover:bg-primary-400"
                >
                    Get Started
                </a>
            </div>
        </header>
    );
}

export default LandingHeader;
