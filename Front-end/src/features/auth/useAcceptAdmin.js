import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { acceptInvitation as apiAcceptInvitation } from "../../services/apiAuth";

export function useAcceptAdmin() {
    const navigate = useNavigate();
    const {
        mutate: acceptInvitation,
        isPending,
        error,
    } = useMutation({
        mutationKey: ["acceptInvitation"],
        mutationFn: ({ data, token }) => apiAcceptInvitation({ data, token }),
        onMutate: () => {
            toast.loading("Accepting invitation...");
        },
        onSuccess: () => {
            toast.success("Invitation accepted successfully!");
            navigate("/login");
        },
        onError: (error) => {
            toast.error(error.message);
            console.error("Error accepting invitation:", error);
        },
    });

    return { acceptInvitation, isPending, backError: error };
}
