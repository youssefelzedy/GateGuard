import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCamera as deleteCameraApi } from "../../services/apiCameras";
import toast from "react-hot-toast";

export function useDeleteCamera() {
    const queryClient = useQueryClient();

    const { mutate: deleteCamera, isPending: isDeleting } = useMutation({
        mutationKey: ["deleteCamera"],
        mutationFn: (id) =>
            toast.promise(deleteCameraApi(id), {
                loading: "Deleting Camera...",
                success: "Camera deleted successfully!",
                error: (err) => err?.message || "Failed to delete camera.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cameras"],
            });
        },
        onError: (error) => {
            console.error("Error deleting camera:", error);
        },
    });

    return { isDeleting, deleteCamera };
}
