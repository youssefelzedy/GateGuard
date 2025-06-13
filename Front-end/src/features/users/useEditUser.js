import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editUser as editUserApi } from "../../services/apiUsers";

export function useEditUser() {
    const { mutate: editUser, error } = useMutation({
        mutationKey: ["editUser"],
        mutationFn: ({ userId, data }) =>
            toast.promise(editUserApi({ userId, data }), {
                loading: "Updating user...",
                success: (data) => data.message || "User updated successfully!",
                error: (err) => err?.message || "Failed to update user.",
            }),
        onError: (error) => {
            console.error("Error updating user:", error);
        },
    });

    return { editUser, error };
}
