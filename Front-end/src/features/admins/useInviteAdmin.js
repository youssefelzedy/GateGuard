import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { inviteAdmin as inviteAdminApi } from "../../services/apiAdmins";
import { useAdmin } from "../auth/useAdmin";

export function useInviteAdmin() {
    const { logout } = useAdmin();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

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
        onSuccess: () => {
            logout();
            queryClient.clear();
            navigate("/login");
        },
    });

    return { inviteAdmin };
}
