import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editUser as editUserApi } from "../../services/apiUsers";
import type { UserInvitationData } from "../../interfaces/user.interface";

export function useEditUser() {
    const queryClient = useQueryClient();

    const {
        mutate: editUser,
        error,
        isPending,
    } = useMutation({
        mutationKey: ["editUser"],
        mutationFn: ({ userId, data }: UserInvitationData) =>
            toast.promise(editUserApi({ userId, data }), {
                loading: "Updating user...",
                success: data => data.message || "User updated successfully!",
                error: err => err?.message || "Failed to update user.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: error => {
            console.error("Error updating user:", error);
        },
    });

    return { editUser, error, isPending };
}
