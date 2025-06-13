import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGarage as updateGarageApi } from "../../services/apiGarages";
import { toast } from "react-hot-toast";

export function useUpdateGarage() {
    const queryClient = useQueryClient();

    const { mutate: updateGarage, isPending } = useMutation({
        mutationFn: updateGarageApi,
        onSuccess: () => {
            toast.success("Garage information updated successfully");
            queryClient.invalidateQueries({ queryKey: ["admin"] });
        },
        onError: (err) => {
            toast.error(err.message || "Failed to update garage information");
        },
    });

    return { updateGarage, isPending };
}
