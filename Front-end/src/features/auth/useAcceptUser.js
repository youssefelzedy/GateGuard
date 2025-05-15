import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { acceptInvitation as apiAcceptInvitation } from "../../services/apiAuth";

export function useAcceptUser() {
    const navigate = useNavigate();

    const { mutate: acceptInvitation, isPending } = useMutation({
        mutationKey: ["acceptInvitation"],
        mutationFn: ({ data, token }) =>
            toast.promise(apiAcceptInvitation({ data, token }), {
                loading: "Accepting invitation...",
                success: "Invitation accepted successfully!",
                error: (err) => err?.message || "Failed to accept invitation.",
            }),
        onSuccess: () => {
            navigate("/");
        },
        onError: (error) => {
            console.error("Error accepting invitation:", error);
        },
    });

    return { acceptInvitation, isPending };
}
