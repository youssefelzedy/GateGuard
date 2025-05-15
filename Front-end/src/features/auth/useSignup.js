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
        mutationFn: (data) =>
            toast.promise(apiSignup(data), {
                loading: "Creating account...",
                success: "Account created successfully!",
                error: (err) =>
                    err?.message || "Signup failed. Please try again.",
            }),
        onSuccess: () => {
            logout();
            queryClient.clear();
            navigate("/login");
        },
        onError: (error) => {
            console.error("Signup failed:", error);
        },
    });

    return { signup, isPending, error };
}
