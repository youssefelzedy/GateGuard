import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGarage as updateGarageApi } from "../../services/apiGarages";

type UpdateGarageData = {
    id?: string;
    garageName?: string;
    location?: string;
};

export function useUpdateGarage() {
    const queryClient = useQueryClient();
    const {
        mutate: updateGarage,
        error,
        isPending,
    } = useMutation({
        mutationKey: ["updateGarage"],
        mutationFn: (garageData: UpdateGarageData) =>
            toast.promise(updateGarageApi(garageData), {
                loading: "Updating garage...",
                success: "Garage updated successfully!",
                error: err => err?.message || "Failed to update garage.",
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin"] });
        },
        onError: error => {
            console.error("Error updating garage:", error);
        },
    });

    return { updateGarage, error, isPending };
}
