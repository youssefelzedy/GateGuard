import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyAccount } from "../../services/apiAuth";

export function useAdmin() {
    const token = localStorage.getItem("token");
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ["user", token],
        queryFn: getMyAccount,
        enabled: !!token,
    });
    const admin = data?.data?.user;

    const logout = () => {
        localStorage.removeItem("token");
        queryClient.clear();
    };

    return { admin, isLoading, isAuth: !!token, logout };
}
