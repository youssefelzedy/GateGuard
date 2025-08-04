import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { acceptInvitation as apiAcceptInvitation } from "../../services/apiAuth";
import type { AdminInvitationData } from "../../interfaces/admin.interface";
import type { LoginResponse } from "../../interfaces/response.interface";
import type { RegistrationError } from "../../interfaces/auth.interface";

export function useAcceptAdmin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const {
        mutate: acceptInvitation,
        isPending,
        error,
    } = useMutation<LoginResponse, RegistrationError, AdminInvitationData>({
        mutationKey: ["acceptInvitation"],
        mutationFn: ({ data, token }: AdminInvitationData) =>
            apiAcceptInvitation({ data, token }),
        onMutate: () => {
            toast.loading("Accepting invitation...");
        },
        onSuccess: () => {
            toast.success("Invitation accepted successfully!");
            queryClient.clear();
            navigate("/login");
        },
        onError: error => {
            toast.error(error.message);
            console.error("Error accepting invitation:", error);
        },
    });

    return { acceptInvitation, isPending, backError: error };
}
