import HeaderLogin from "../features/auth/HeaderLogin";
import UserForm from "../features/auth/RegistrationForm";

function Registration() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
            <HeaderLogin />
            <UserForm />
        </div>
    );
}

export default Registration;
