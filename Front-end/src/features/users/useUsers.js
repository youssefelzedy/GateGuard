import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";

export function useUsers(garageId) {
    const { data, isLoading } = useQuery({
        queryKey: ["users", garageId],
        queryFn: () => getUsers(garageId),
        enabled: !!garageId,
    });

    return { users: data?.data?.users, isLoading };
}
