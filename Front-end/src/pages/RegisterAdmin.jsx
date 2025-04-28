import HeaderLogin from "../features/auth/HeaderLogin";
import RegisterAdminForm from "../features/auth/RegisterAdminForm";

function RegisterAdmin() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
            <HeaderLogin />
            <RegisterAdminForm />
        </div>
    );
}

export default RegisterAdmin;
