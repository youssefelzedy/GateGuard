export interface Camera {
    _v: number;
    _id: string;
    cameraStatus: "active" | "inactive";
    cameraIP: string;
    cameraName: string;
    garage: {
        _id: string;
        garageName: string;
        location: string;
    };
    createdAt: string;
    updatedAt: string;
}
