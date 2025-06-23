import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGarage as updateGarageApi } from "../../services/apiGarages";

export function useUpdateGarage() {
    const queryClient = useQueryClient();

    const { mutate: updateGarage, error } = useMutation({
        mutationKey: ["updateGarage"],
        mutationFn: (data) =>
            toast.promise(updateGarageApi(data), {
                loading: "Updating garage...",
                success: (data) =>
                    data.message || "Garage updated successfully!",
                error: (err) => err?.message || "Failed to update garage.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin"] });
        },
        onError: (error) => {
            console.error("Error updating garage:", error);
        },
    });

    return { updateGarage, error };
}
