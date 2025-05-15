import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signup as apiSignup } from "../../services/apiAuth";
import { useAdmin } from "./useAdmin";

export function useSignup() {
    const { logout } = useAdmin();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {
        mutate: signup,
        isPending,
        error,
    } = useMutation({
        mutationKey: ["signup"],
        mutationFn: (data) => apiSignup(data),
        onMutate: () => {
            toast.loading("Account creating...");
        },
        onSuccess: () => {
            navigate("/dashboard");
            toast.success("Account created successfully!");
            logout();
            queryClient.clear();
        },
        onError: (error) => {
            console.log("Signup failed:", error);
            toast.error("Signup failed. Please fix the errors and try again.");
        },
    });

    return { signup, isPending, error };
}
