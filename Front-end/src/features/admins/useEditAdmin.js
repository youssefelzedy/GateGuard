import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editAdmin as editAdminApi } from "../../services/apiAdmins";

export function useEditAdmin() {
    const queryClient = useQueryClient();

    const { mutate: editAdmin, isPending } = useMutation({
        mutationFn: ({ adminId, data }) =>
            toast.promise(editAdminApi({ adminId, data }), {
                loading: "Updating admin...",
                success: (data) =>
                    data.message || "Admin updated successfully!",
                error: (err) => err?.message || "Failed to update admin.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error) => {
            console.error("Error updating admin:", error);
        },
    });

    return { editAdmin, isPending };
}
