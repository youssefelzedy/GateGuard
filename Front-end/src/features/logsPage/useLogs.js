import { useQuery } from "@tanstack/react-query";
import { getLogs } from "../../services/apiLogs";

export function useLogs(garageId) {
    const { data, isLoading } = useQuery({
        queryKey: ["logs", garageId],
        queryFn: () => getLogs(garageId),
        enabled: !!garageId,
        refetchInterval: 10000,
    });

    return { logs: data?.data?.logs, isLoading };
}
