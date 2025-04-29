import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { inviteAdmin as inviteAdminApi } from "../../services/apiAdmins";

export function useInviteAdmin() {
    const { mutate: inviteAdmin } = useMutation({
        mutationKey: ["inviteAdmin"],
        mutationFn: (email) => inviteAdminApi(email),
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { inviteAdmin };
}
