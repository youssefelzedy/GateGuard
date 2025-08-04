import type {
    AdminInvitationData,
    UpdateAdminData,
} from "../interfaces/admin.interface";
import type { LoginData, RegistrationData } from "../interfaces/auth.interface";
import type { LoginResponse } from "../interfaces/response.interface";
import type { UserInvitationData } from "../interfaces/user.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function login(data: LoginData): Promise<LoginResponse> {
    const res = await fetch(`${VITE_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return res.json();
}

export async function getMyAccount(): Promise<LoginResponse> {
    const res = await fetch(`${VITE_API_URL}/admins/me`, {
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

export async function signup(data: RegistrationData): Promise<LoginResponse> {
    const res = await fetch(`${VITE_API_URL}/auth/signupAndCreate`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw error;
    }
    return res.json();
}

export async function acceptInvitation({
    data,
    token,
}: AdminInvitationData | UserInvitationData) {
    const res = await fetch(`${VITE_API_URL}/invitations/accept/${token}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw error;
    }
    return res.json();
}

export async function updateAdmin(
    data: UpdateAdminData
): Promise<LoginResponse> {
    const res = await fetch(`${VITE_API_URL}/admins/me`, {
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
