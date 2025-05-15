import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "../auth/useAdmin";
import { getAdmins } from "../../services/apiAdmins";

export function useAdmins() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?.id;
    console.log(garageId);
    const { data, isLoading } = useQuery({
        queryKey: ["admins", garageId],
        queryFn: getAdmins(garageId),
        enabled: !!garageId,
    });
    return { admins: data?.data?.admins, isLoading };
}
