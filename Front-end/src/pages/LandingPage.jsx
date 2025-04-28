import AboutSection from "../features/LandingPage/AboutSection";
import FeaturesSection from "../features/LandingPage/FeaturesSection";
import Footer from "../features/LandingPage/Footer";
import HeroSection from "../features/LandingPage/HeroSection";
import LandingHeader from "../features/LandingPage/LandingHeader";
import Slider from "../features/LandingPage/Slider";

function LandingPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <div className="fixed inset-0 z-0 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat"></div>
            <div className="fixed inset-0 z-10 bg-primary-700 opacity-80 mix-blend-multiply backdrop-blur-sm" />
            <div className="relative z-30 mb-40 w-full px-4 md:px-6 lg:px-8">
                <LandingHeader />
            </div>
            <div className="relative z-20 mt-4 w-full flex-grow md:mt-8">
                <HeroSection />
                <FeaturesSection />
                <Slider />
                <AboutSection />
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;
