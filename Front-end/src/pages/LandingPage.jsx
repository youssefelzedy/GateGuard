// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AboutSection from "../features/LandingPage/AboutSection";
import FeaturesSection from "../features/LandingPage/FeaturesSection";
import Footer from "../features/LandingPage/Footer";
import HeroSection from "../features/LandingPage/HeroSection";
import LandingHeader from "../features/LandingPage/LandingHeader";
import Slider from "../features/LandingPage/Slider";
import FloatingCTA from "../features/LandingPage/FloatingCTA";
import ScrollProgress from "../features/LandingPage/ScrollProgress";
import bgImage from "../assets/bg.jpg";
import FullScreenLoader from "../ui/FullScreenLoader";

function LandingPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
        exit: { opacity: 0 },
    };

    return (
        <AnimatePresence mode="wait">
            {isLoading ? (
                <motion.div
                    key="loader"
                    {...fadeIn}
                    className="flex min-h-screen items-center justify-center bg-primary-100"
                >
                    <FullScreenLoader />
                </motion.div>
            ) : (
                <motion.div
                    key="landing"
                    {...fadeIn}
                    className="relative flex min-h-screen w-full flex-col overflow-x-hidden"
                >
                    <ScrollProgress />
                    <div className="relative">
                        {/* Hero Section with Background */}
                        <div className="absolute inset-0 z-0">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${bgImage})` }}
                            ></div>
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
                    <FloatingCTA />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default LandingPage;
