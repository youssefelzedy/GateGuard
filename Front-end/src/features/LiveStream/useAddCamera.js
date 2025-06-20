import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCamera as addCameraApi } from "../../services/apiCameras";

export function useAddCamera() {
    const queryClient = useQueryClient();
    const { mutate: addCamera, isPending } = useMutation({
        mutationKey: ["addCamera"],
        mutationFn: (data) =>
            toast.promise(addCameraApi(data), {
                loading: "Adding Camera...",
                success: (data) => data.message || "Camera added successfully!",
                error: (err) => err?.message || "Failed to add camera.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cameras"] });
        },
        onError: (error) => {
            console.error("Error adding camera:", error);
        },
    });

    return { addCamera, isPending };
}
