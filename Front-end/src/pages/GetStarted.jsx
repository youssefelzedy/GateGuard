import HeaderLogin from "../features/auth/HeaderLogin";
import RegistrationStepper from "../features/auth/RegistrationForm";

function GetStarted() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-primary-100">
            <HeaderLogin />
            <RegistrationStepper />
        </div>
    );
}

export default GetStarted;
