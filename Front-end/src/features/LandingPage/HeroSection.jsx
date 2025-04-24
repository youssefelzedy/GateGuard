function HeroSection() {
    return (
        <section className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
                <span className="bg-gradient-to-r from-primary-400 to-white bg-clip-text text-transparent">
                    Automate
                </span>{" "}
                your <br /> Garage Gate
            </h1>
            <button className="mt-8 rounded bg-primary-500 px-6 py-3 text-lg text-white transition hover:bg-blue-700">
                Learn more
            </button>

            <div className="mt-12 w-full max-w-5xl">
                <img
                    src="/Dashboard.png"
                    alt="Hero"
                    className="h- h-auto w-full rounded-lg shadow-lg"
                />
            </div>
        </section>
    );
}
export default HeroSection;
