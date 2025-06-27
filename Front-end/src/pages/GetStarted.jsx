import { useEffect, useState } from "react";
import HeaderLogin from "../features/auth/HeaderLogin";
import RegistrationStepper from "../features/auth/RegistrationForm";
import FullScreenLoader from "../ui/FullScreenLoader";

function GetStarted() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <FullScreenLoader />;
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center bg-primary-100">
            <HeaderLogin />
            <RegistrationStepper />
        </div>
    );
}

export default GetStarted;
