import HeaderLogin from "../features/auth/HeaderLogin";
import InviteUserForm from "../features/auth/InviteUserForm";

function InviteUser() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-primary-100">
            <HeaderLogin />
            <InviteUserForm />
        </div>
    );
}

export default InviteUser;
