import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signup as apiSignup } from "../../services/apiAuth";
import { useAdmin } from "./useAdmin";
import type {
    RegistrationData,
    RegistrationError,
} from "../../interfaces/auth.interface";
import type { LoginResponse } from "../../interfaces/response.interface";

export function useSignup() {
    const { logout } = useAdmin();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {
        mutate: signup,
        isPending,
        error,
    } = useMutation<LoginResponse, RegistrationError, RegistrationData>({
        mutationKey: ["signup"],
        mutationFn: (data: RegistrationData) =>
            toast.promise(apiSignup(data), {
                loading: "Creating account...",
                success: "Account created successfully!",
                error: err =>
                    err?.message || "Signup failed. Please try again.",
            }),
        onSuccess: () => {
            logout();
            queryClient.clear();
            navigate("/login");
        },
        onError: error => {
            console.error("Signup failed:", error);
        },
    });

    return { signup, isPending, error };
}
