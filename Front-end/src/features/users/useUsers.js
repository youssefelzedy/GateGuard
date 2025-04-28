import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiUsers";

export function useUsers(garageId) {
    const { data, isLoading } = useQuery({
        queryKey: ["users", garageId],
        queryFn: () => getUsers(garageId),
        enabled: !!garageId,
    });

    const users = data?.data?.users;
    return { users, isLoading };
}
