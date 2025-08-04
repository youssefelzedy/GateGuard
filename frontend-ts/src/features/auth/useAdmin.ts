import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyAccount } from "../../services/apiAuth";
import { useNavigate } from "react-router";

export function useAdmin() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ["admin", token],
        queryFn: getMyAccount,
        enabled: !!token,
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
    const admin = data?.data?.admin;
    const isOwner = admin?.role === "Owner";
    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token");
        queryClient.clear();
    };

    return { admin, isLoading, isAuth: !!token, logout, isOwner };
}
