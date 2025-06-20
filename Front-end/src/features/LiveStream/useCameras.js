import { useQuery } from "@tanstack/react-query";
import { getGarageCameras } from "../../services/apiCameras";

export function useCameras(garageId) {
    const { data, isLoading } = useQuery({
        queryKey: ["cameras", garageId],
        queryFn: () => getGarageCameras(garageId),
        enabled: !!garageId,
    });

    return { cameras: data?.data?.cameras, isLoading };
}
