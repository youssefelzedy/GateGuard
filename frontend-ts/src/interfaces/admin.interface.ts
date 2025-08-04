export interface Admin {
    _id: string;
    _v: number;
    name: string;
    email: string;
    status: "active" | "inactive";
    phoneNumber: string;
    nationalSecurityNumber: string;
    registeredDate: string;
    image: string;
    role: "Owner" | "Observer";
    garage: {
        _id: string;
        garageName: string;
        location: string;
    };
}

export interface UpdateAdminData {
    adminId: string;
    data: {
        name?: string;
        phoneNumber?: string;
        nationalSecurityNumber?: string;
    };
    imageFile?: File;
}

export interface AdminInvitationData {
    token: string;
    data: {
        password: string;
        passwordConfirm: string;
        name: string;
        phoneNumber: string;
        nationalSecurityNumber: string;
    };
}
