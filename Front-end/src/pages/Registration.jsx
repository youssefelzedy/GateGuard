import HeaderLogin from "../features/auth/HeaderLogin";
import RegistrationForm from "../features/auth/RegistrationForm";

function Registration() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
            <HeaderLogin />
            <RegistrationForm />
        </div>
    );
}

export default Registration;
