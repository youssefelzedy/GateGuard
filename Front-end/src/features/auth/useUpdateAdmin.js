import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdmin as updateAdminApi } from "../../services/apiAuth";

export function useUpdateAdmin() {
    const queryClient = useQueryClient();

    const { mutate: updateAdmin, isPending } = useMutation({
        mutationFn: updateAdminApi,
        onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries({ queryKey: ["admin"] });
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update profile");
        },
    });

    return { updateAdmin, isPending };
}
