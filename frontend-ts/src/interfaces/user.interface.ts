export interface User {
    _id: string;
    __v: number;
    status: "active" | "inactive";
    name: string;
    email: string;
    phoneNumber: string;
    nationalSecurityNumber: string;
    carPlate: string;
    garage: {
        _id: string;
        garageName: string;
    };
}

export interface UserInvitationData {
    token?: string;
    userId?: string;
    data: {
        name: string;
        phoneNumber: string;
        nationalSecurityNumber: string;
        carPlate: string;
    };
}
export interface UserInvitationFormData {
    token?: string;
    userId?: string;
    data: {
        name: string;
        phoneNumber: string;
        nationalSecurityNumber: string;
        numbers: string[];
        letters: string[];
        confirmed?: boolean;
    };
}
