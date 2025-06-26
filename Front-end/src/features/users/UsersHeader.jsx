import { useState } from "react";
import { useInviteUser } from "./useInviteUser";
import { Plus } from "lucide-react";
import InviteUserModal from "./InviteUserModal";

function UsersHeader() {
    const [inviteUserForm, setInviteUserForm] = useState(false);
    const { inviteUser, isPending } = useInviteUser();
    const handleInvite = (email, reset) => {
        inviteUser(
            { email },
            {
                onSettled: () => {
                    reset();
                    setInviteUserForm(false);
                },
            },
        );
    };
    return (
        <div className="mb-4 flex items-center justify-between rounded px-4">
            <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-100">
                Users
            </h1>
            <button
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 px-5 py-2 shadow-lg transition-all duration-300 hover:from-primary-700 hover:to-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:from-primary-700 dark:to-primary-600 dark:hover:from-primary-800 dark:hover:to-primary-700"
                onClick={() => setInviteUserForm(true)}
            >
                <Plus className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
                <span className="font-sans text-base font-semibold tracking-wide text-white">
                    Invite User
                </span>
            </button>

            <InviteUserModal
                open={inviteUserForm}
                onClose={() => setInviteUserForm(false)}
                onSubmit={handleInvite}
                loading={isPending}
            />
        </div>
    );
}

export default UsersHeader;
