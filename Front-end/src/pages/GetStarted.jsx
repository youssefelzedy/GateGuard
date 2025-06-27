import { useEffect, useState } from "react";
import HeaderLogin from "../features/auth/HeaderLogin";
import RegistrationStepper from "../features/auth/RegistrationForm";
import loader from "../assets/Loading_Animation_3_clip.webm";

function GetStarted() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-primary-100">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="w-52 object-contain sm:w-48 md:w-60 lg:w-72 xl:w-96"
                    src={loader}
                />
            </div>
        );
    }
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-primary-100">
            <HeaderLogin />
            <RegistrationStepper />
        </div>
    );
}

export default GetStarted;
