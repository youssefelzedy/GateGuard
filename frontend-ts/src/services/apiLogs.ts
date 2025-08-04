import type { Log } from "../interfaces/logs.interface";
import type { ApiResponse } from "../interfaces/response.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getLogs(garageId: string): Promise<ApiResponse<Log>> {
    const res = await fetch(`${VITE_API_URL}/garages/${garageId}/logs`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return res.json();
}
