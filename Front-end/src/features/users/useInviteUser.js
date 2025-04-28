import { useMutation } from "@tanstack/react-query";
import { InviteUser as inviteUserApi } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useInviteUser() {
    const { mutate: inviteUser } = useMutation({
        mutationKey: ["inviteUser"],
        mutationFn: (email) => inviteUserApi(email),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        },
    });
    return { inviteUser };
}
