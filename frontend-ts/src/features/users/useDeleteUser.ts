import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser as deleteUserApi } from "../../services/apiUsers";

export function useDeleteUser() {
    const queryClient = useQueryClient();

    const { mutate: deleteUser, isPending } = useMutation({
        mutationFn: (userId: string) =>
            toast.promise(deleteUserApi(userId), {
                loading: "Deleting user...",
                success: "User deleted successfully!",
                error: "Failed to delete user.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => {
            console.error("Failed to delete user.");
        },
    });

    return { deleteUser, isPending };
}
