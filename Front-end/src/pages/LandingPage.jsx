import HeroSection from "../features/LandingPage/HeroSection";
import LandingHeader from "../features/LandingPage/LandingHeader";

function LandingPage() {
    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 z-0 bg-[url('/bg.jpg')] bg-cover bg-center"></div>
            <div className="absolute inset-0 z-10 bg-primary-400 mix-blend-multiply backdrop-blur-sm" />
            <div className="relative z-30 mb-40">
                <LandingHeader />
            </div>
            <div className="relative z-20">
                <HeroSection />
            </div>
        </div>
    );
}

export default LandingPage;
