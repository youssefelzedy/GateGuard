import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteUser as deleteUserApi } from "../../services/apiUsers";

export function useDeleteUser() {
    const queryClient = useQueryClient();

    const { mutate: deleteUser, isPending } = useMutation({
        mutationFn: (userId) =>
            toast.promise(deleteUserApi(userId), {
                loading: "Deleting user...",
                success: (data) => data.message || "User deleted successfully!",
                error: (err) => err?.message || "Failed to delete user.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            console.error("Error deleting user:", error);
        },
    });

    return { deleteUser, isPending };
}
