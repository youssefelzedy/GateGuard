import type { Admin } from "./admin.interface";

export interface ApiResponse<T> {
    status: string;
    results?: number;
    data: {
        [key: string]: T[];
    };
}

export interface LoginResponse {
    status: string;
    token?: string;
    data: {
        [key: string]: Admin;
    };
}

export interface InvitationResponse {
    status: string;
    message: string;
    invitation: {
        email: string;
        garage: string;
        invitationType: "user" | "admin";
        invitedBy: string;
        expires: string;
    };
}
