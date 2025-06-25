import { useState, useEffect } from "react";
import AboutSection from "../features/LandingPage/AboutSection";
import FeaturesSection from "../features/LandingPage/FeaturesSection";
import Footer from "../features/LandingPage/Footer";
import HeroSection from "../features/LandingPage/HeroSection";
import LandingHeader from "../features/LandingPage/LandingHeader";
import Slider from "../features/LandingPage/Slider";
import FloatingCTA from "../features/LandingPage/FloatingCTA";
import ScrollProgress from "../features/LandingPage/ScrollProgress";

function LandingPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-primary-700">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent sm:h-16 sm:w-16"></div>
                    <p className="text-lg font-semibold text-white sm:text-xl">
                        Loading GateGuard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <ScrollProgress />
            <div className="relative">
                {/* Hero Section with Background */}
                <div className="relative">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat"></div>
                        <div className="absolute inset-0 bg-primary-700 opacity-80 mix-blend-multiply backdrop-blur-sm"></div>
                    </div>
                    <div className="relative z-30 w-full px-4 sm:px-6 md:px-8">
                        <LandingHeader />
                    </div>
                    <div className="relative z-20 w-full">
                        <HeroSection />
                    </div>
                </div>

                {/* Rest of the Content */}
                <div className="relative z-20 w-full bg-white">
                    <FeaturesSection />
                    <Slider />
                    <AboutSection />
                    <Footer />
                </div>
            </div>
            <FloatingCTA />
        </div>
    );
}

export default LandingPage;
