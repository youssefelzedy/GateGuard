import type { ApiResponse } from "../interfaces/response.interface";
import type { User, UserInvitationData } from "../interfaces/user.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getUsers(garageId: string): Promise<ApiResponse<User>> {
    const res = await fetch(`${VITE_API_URL}/garages/${garageId}/users`, {
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

export async function InviteUser({ email }: { email: string }) {
    const res = await fetch(`${VITE_API_URL}/invitations/sendUser`, {
        method: "POST",
        body: JSON.stringify({ email }),
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

export async function editUser({ userId, data }: UserInvitationData) {
    const res = await fetch(`${VITE_API_URL}/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
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

export async function deleteUser(userId: string) {
    const res = await fetch(`${VITE_API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
}
