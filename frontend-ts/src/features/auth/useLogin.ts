import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login as apiLogin } from "../../services/apiAuth";
import type { LoginData } from "../../interfaces/auth.interface";

export function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: async ({ email, password }: LoginData) => {
            return await toast.promise(apiLogin({ email, password }), {
                loading: "Logging in...",
                success: "Login successful!",
                error: err => err?.message || "Login failed. Please try again.",
            });
        },
        onSuccess: data => {
            localStorage.setItem("token", data.token!);
            queryClient.setQueryData(["user"], data.data.user);
            navigate("/dashboard");
        },
        onError: error => {
            console.error("Login failed:", error);
        },
    });

    return { login, isPending };
}
