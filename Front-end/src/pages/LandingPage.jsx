import LandingHeader from "../features/LandingPage/LandingHeader";

function LandingPage() {
    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-0 z-0 bg-[url('/bg.jpg')] bg-cover bg-center blur-sm">
                <div className="absolute left-0 right-0 top-0 z-20"></div>
            </div>
            <div className="relative z-30">
                <LandingHeader />
            </div>
        </div>
    );
}

export default LandingPage;
