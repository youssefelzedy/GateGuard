import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAdmin as deleteAdminApi } from "../../services/apiAdmins";

export function useDeleteAdmin() {
    const queryClient = useQueryClient();

    const { mutate: deleteAdmin, isPending } = useMutation({
        mutationFn: (adminId: string) =>
            toast.promise(deleteAdminApi(adminId), {
                loading: "Deleting admin...",
                success: "Admin deleted successfully!",
                error: "Failed to delete admin.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admins"] });
        },
        onError: () => {
            console.error("Failed to delete admin.");
        },
    });

    return { deleteAdmin, isPending };
}
