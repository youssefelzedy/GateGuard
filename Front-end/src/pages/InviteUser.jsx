import HeaderLogin from "../features/auth/HeaderLogin";
import InviteForm from "../features/auth/InviteAdminForm";

function InviteUser() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-primary-100">
            <HeaderLogin />
            <InviteForm />
        </div>
    );
}

export default InviteUser;
