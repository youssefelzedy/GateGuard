import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyAccount } from "../../services/apiAuth";
import { replace, useNavigate } from "react-router";

export function useAdmin() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ["admin", token],
        queryFn: getMyAccount,
        enabled: !!token,
    });
    const admin = data?.data?.user;
    const isOwner = admin?.role === "owner";
    const logout = () => {
        localStorage.removeItem("token");
        queryClient.clear();
        navigate("login", replace);
    };

    return { admin, isLoading, isAuth: !!token, logout, isOwner };
}
