import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { acceptInvitation as apiAcceptInvitation } from "../../services/apiAuth";

export function useInvitation() {
    const navigate = useNavigate();
    const { mutate: acceptInvitation, isPending } = useMutation({
        mutationKey: ["acceptInvitation"],
        mutationFn: ({ data, token }) => apiAcceptInvitation({ data, token }),
        onMutate: () => {
            toast.loading("Accepting invitation...");
        },
        onSuccess: (data) => {
            toast.success("Invitation accepted successfully!");
            data.invitation.invitationType === "admin"
                ? navigate("/login")
                : navigate("/");
        },
        onError: (error) => {
            toast.error(error.message);
            console.error("Error accepting invitation:", error);
        },
    });

    return { acceptInvitation, isPending };
}
