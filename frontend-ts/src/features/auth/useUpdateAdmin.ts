import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    updateAdmin as updateAdminApi,
    uploadAdminImage,
} from "../../services/apiAdmins";
import type { UpdateAdminData } from "../../interfaces/admin.interface";

export function useUpdateAdmin() {
    const queryClient = useQueryClient();

    const {
        mutate: updateAdmin,
        isPending,
        error,
    } = useMutation<UpdateAdminData, unknown, UpdateAdminData>({
        mutationFn: async ({ adminId, data, imageFile }: UpdateAdminData) => {
            return toast.promise(
                (async () => {
                    if (imageFile) await uploadAdminImage(imageFile);

                    return await updateAdminApi({ adminId, data });
                })(),
                {
                    loading: "Updating profile...",
                    success: "Profile updated successfully",
                    error: err => err?.message || "Failed to update profile",
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin"] });
        },
    });

    return { updateAdmin, isPending, error };
}
