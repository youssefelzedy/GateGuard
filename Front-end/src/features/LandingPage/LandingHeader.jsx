function LandingHeader() {
    return (
        <header className="flex items-center justify-between bg-transparent px-10 py-6">
            <div className="mx-4 flex items-center">
                <img
                    src="/Logo.svg"
                    alt="Logo"
                    className="h-14 w-auto bg-transparent"
                />
            </div>

            <nav className="mx-4 hidden gap-10 md:flex">
                <a
                    href="#features"
                    className="text-lg font-semibold text-primary-50 transition-colors hover:text-primary-600"
                >
                    Features
                </a>
                <a
                    href="#about"
                    className="text-lg font-semibold text-primary-50 transition-colors hover:text-primary-600"
                >
                    About
                </a>
                <a
                    href="#contact"
                    className="text-lg font-semibold text-primary-50 transition-colors hover:text-primary-600"
                >
                    Contact
                </a>
            </nav>

            <div className="flex items-center gap-6">
                <a
                    href="/login"
                    className="inline-flex h-10 w-24 items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-base font-semibold text-primary-50 shadow-md transition-all hover:bg-primary-400 hover:shadow-lg active:scale-95"
                >
                    Log in
                </a>
                <a
                    href="/get-started"
                    className="inline-flex h-10 w-32 items-center justify-center rounded-lg border-2 border-primary-50 px-4 py-2 text-base font-semibold text-primary-50 shadow-md transition-all hover:bg-primary-50 hover:text-primary-700 hover:shadow-lg active:scale-95"
                >
                    Get Started
                </a>
            </div>
        </header>
    );
}

export default LandingHeader;
