import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { InviteUser as inviteUserApi } from "../../services/apiUsers";

export function useInviteUser() {
    const { mutate: inviteUser } = useMutation({
        mutationKey: ["inviteUser"],
        mutationFn: (email) => inviteUserApi(email),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { inviteUser };
}
