import { useState } from "react";
import { useInviteAdmin } from "./useInviteAdmin";
import { Plus } from "lucide-react";
import InviteAdminModal from "./InviteAdminModal";

function AdminsHeader() {
    const [inviteAdminOpen, setInviteAdminOpen] = useState(false);
    const { inviteAdmin, isPending } = useInviteAdmin();
    const handleInvite = (email, reset) => {
        inviteAdmin(
            { email },
            {
                onSettled: () => {
                    reset();
                    setInviteAdminOpen(false);
                },
            },
        );
    };
    return (
        <div className="flex items-center justify-between rounded-lg transition-colors duration-300">
            <h1 className="text-4xl font-bold text-primary-900 dark:text-primary-100">
                Admins
            </h1>
            <button
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 px-5 py-2 shadow-lg transition-all duration-300 hover:from-primary-700 hover:to-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:from-primary-700 dark:to-primary-600 dark:hover:from-primary-800 dark:hover:to-primary-700"
                onClick={() => setInviteAdminOpen(true)}
            >
                <Plus className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
                <span className="font-sans text-base font-semibold tracking-wide text-white">
                    Invite Admin
                </span>
            </button>

            <InviteAdminModal
                open={inviteAdminOpen}
                onClose={() => setInviteAdminOpen(false)}
                onSubmit={handleInvite}
                loading={isPending}
            />
        </div>
    );
}

export default AdminsHeader;
