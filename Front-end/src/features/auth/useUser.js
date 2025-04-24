import { useQuery } from "@tanstack/react-query";
import { getMyAccount } from "../../services/apiAuth";

export function useUser() {
    const token = localStorage.getItem("token");
    const { data: user, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: getMyAccount,
        enabled: token,
    });
    return { user, isLoading };
}
