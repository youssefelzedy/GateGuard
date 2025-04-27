function FeaturesSection() {
    return (
        <section id="features" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
                    Features
                </h2>
                <div className="space-y-12">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="px-4 md:w-1/2">
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">
                                Stay Informed
                            </h3>
                            <p className="mb-4 text-gray-600">
                                Be aware of every vehicle that entered the
                                garage, manage employee & visitor access
                                efficiently.
                            </p>
                        </div>
                        <div className="px-4 md:w-1/2">
                            <img
                                src="/feature-1.png"
                                alt="Stay Informed"
                                className="w-full rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="px-4 md:w-1/2">
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">
                                Stay In Control
                            </h3>
                            <p className="mb-4 text-gray-600">
                                Control who has access to your garage, automate
                                entry & reduce security risks.
                            </p>
                        </div>
                        <div className="px-4 md:w-1/2">
                            <img
                                src="/feature-2.png"
                                alt="Stay In Control"
                                className="w-full rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="px-4 md:w-1/2">
                            <h3 className="mb-4 text-xl font-semibold text-gray-800">
                                Stay Vigilant
                            </h3>
                            <p className="mb-4 text-gray-600">
                                Using the live stream feature, keep an eye on
                                the garage gate 24/7, with the ability to add
                                other cameras.
                            </p>
                        </div>
                        <div className="px-4 md:w-1/2">
                            <img
                                src="/feature-3.png"
                                alt="Stay Vigilant"
                                className="w-full rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
