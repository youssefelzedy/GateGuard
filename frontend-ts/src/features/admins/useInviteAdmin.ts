import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { inviteAdmin as inviteAdminApi } from "../../services/apiAdmins";

export function useInviteAdmin() {
    const { mutate: inviteAdmin, isPending } = useMutation({
        mutationKey: ["inviteAdmin"],
        mutationFn: ({ email }: { email: string }) =>
            toast.promise(inviteAdminApi(email), {
                loading: "Sending admin invitation...",
                success: "Admin invited successfully!",
                error: err => err?.message || "Failed to invite admin.",
            }),
        onError: error => {
            console.error("Error inviting admin:", error);
        },
    });

    return { inviteAdmin, isPending };
}
