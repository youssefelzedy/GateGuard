import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { inviteAdmin as inviteAdminApi } from "../../services/apiAdmins";

export function useInviteAdmin() {
    const { mutate: inviteAdmin } = useMutation({
        mutationKey: ["inviteAdmin"],
        mutationFn: ({ email }) =>
            toast.promise(inviteAdminApi({ email }), {
                loading: "Sending admin invitation...",
                success: (data) =>
                    data.message || "Admin invited successfully!",
                error: (err) => err?.message || "Failed to invite admin.",
            }),
        onError: (error) => {
            console.error("Error inviting admin:", error);
        },
    });

    return { inviteAdmin };
}
