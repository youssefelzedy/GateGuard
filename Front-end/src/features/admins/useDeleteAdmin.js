import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAdmin as deleteAdminApi } from "../../services/apiAdmins";

export function useDeleteAdmin() {
    const queryClient = useQueryClient();

    const { mutate: deleteAdmin, isPending } = useMutation({
        mutationFn: (adminId) =>
            toast.promise(deleteAdminApi(adminId), {
                loading: "Deleting admin...",
                success: (data) =>
                    data.message || "Admin deleted successfully!",
                error: (err) => err?.message || "Failed to delete admin.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: (error) => {
            console.error("Error deleting admin:", error);
        },
    });

    return { deleteAdmin, isPending };
}
