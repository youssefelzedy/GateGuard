import DashboardImage from "../../assets/pages/Dashboard.png";

function HeroSection() {
    return (
        <section className="relative z-20 -mt-6 flex min-h-screen w-full items-center justify-center overflow-hidden">
            <div className="flex w-full flex-col items-center justify-center px-4 text-center sm:px-6 md:px-8">
                <div className="mb-6">
                    <h1 className="flex flex-col text-4xl font-extrabold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        <span>Automated Garage</span>
                        <span className="bg-gradient-to-r from-primary-300 to-primary-400 bg-clip-text text-transparent">
                            Access Control
                        </span>
                    </h1>
                </div>
                <p className="max-w-xl text-base text-primary-200/90 sm:text-lg md:text-xl">
                    Secure, automate, and monitor your garage access with ease.
                    The ultimate solution for modern organizations.
                </p>
                <div className="relative mt-12 w-full max-w-7xl">
                    <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-primary-400 to-primary-600 opacity-60 blur-2xl"></div>
                    <img
                        src={DashboardImage}
                        alt="Dashboard preview"
                        className="relative w-full rounded-xl border-2 border-primary-300/40 shadow-2xl shadow-primary-500/30"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
