export interface Log {
    _id: string;
    plateText: string;
    action: "Accepted" | "Denied";
    accessTime: string;
    user: {
        _id: string;
        name: string;
        phoneNumber: string;
    };
    garage: {
        _id: string;
        location: string;
    };
    processed: boolean;
    carDetection: [number, number, number, number, number][];
    plateDetection: [number, number, number, number, number, number][];
}
