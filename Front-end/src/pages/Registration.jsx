import HeaderLogin from "../Components/HeaderLogin";
import UserForm from "../Components/RegistrationForm";

function Registration() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
            <HeaderLogin />
            <UserForm />
        </div>
    );
}

export default Registration;
