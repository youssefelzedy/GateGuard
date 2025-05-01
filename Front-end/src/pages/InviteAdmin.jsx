import HeaderLogin from "../features/auth/HeaderLogin";
import InviteAdminForm from "../features/auth/InviteUserForm";

function InviteAdmin() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-primary-100">
            <HeaderLogin />
            <InviteAdminForm />
        </div>
    );
}

export default InviteAdmin;
