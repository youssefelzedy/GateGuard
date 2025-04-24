import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as apiLogin } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin({ email, password }) {
    const queryClient = useQueryClient();
    const { mutate: login, isPending } = useMutation({
        mutationKey: ["user"],
        mutationFn: () => apiLogin({ email, password }),
        variables: { email, password },
        onMutate: () => {
            toast.loading("Logging in...");
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            queryClient.setQueryData(["user"], data.data.user);
            toast.success("Login successful!");
        },
        onError: (error) => {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        },
    });

    return { login, isPending };
}
