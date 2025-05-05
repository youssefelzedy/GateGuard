import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login as apiLogin } from "../../services/apiAuth";

export function useLogin({ email, password }) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: login, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: () => apiLogin({ email, password }),
        variables: { email, password },
        onMutate: () => {
            toast.loading("Logging in...");
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            queryClient.setQueryData(["user"], data.data.user);
            navigate("/dashboard");
            toast.success("Login successful!");
        },
        onError: (error) => {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        },
    });

    return { login, isPending };
}
