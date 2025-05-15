import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "../../services/apiAdmins";

export function useAdmins(garageId) {
    const { data, isLoading } = useQuery({
        queryKey: ["admins", garageId],
        queryFn: () => getAdmins(garageId),
        enabled: !!garageId,
    });
    return { admins: data?.data?.admins, isLoading };
}
