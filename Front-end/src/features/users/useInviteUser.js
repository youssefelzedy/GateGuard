import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { InviteUser as inviteUserApi } from "../../services/apiUsers";

export function useInviteUser() {
    const { mutate: inviteUser } = useMutation({
        mutationKey: ["inviteUser"],
        mutationFn: ({ email }) =>
            toast.promise(inviteUserApi({ email }), {
                loading: "Sending invitation...",
                success: (data) =>
                    data.message || "Invitation sent successfully!",
                error: (err) => err?.message || "Failed to send invitation.",
            }),
        onError: (error) => {
            console.error("Error inviting user:", error);
        },
    });

    return { inviteUser };
}
