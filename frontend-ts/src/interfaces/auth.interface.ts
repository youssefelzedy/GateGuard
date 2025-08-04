export interface LoginData {
    email: string;
    password: string;
}

export interface RegistrationData {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phoneNumber: string;
    nationalSecurityNumber: string;
    garageName: string;
    location: string;
    agree?: boolean;
}

export type RegistrationError = {
    status: "fail" | "error";
    statusCode: number;
    type: string;
    message: string;
    field?: string;
    stack?: string;
    error: {
        statusCode: number;
        status: "fail" | "error";
        isOperational: boolean;
        type: string;
        field?: string;
    };
};
