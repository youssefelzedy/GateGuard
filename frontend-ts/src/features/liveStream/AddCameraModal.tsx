import { useState, useEffect, type FormEvent } from "react";
import { useAddCamera } from "./useAddCamera";

type AddCameraModalProp = {
    open: boolean;
    onClose: () => void;
};

function AddCameraModal({ open, onClose }: AddCameraModalProp) {
    const { addCamera, isPending } = useAddCamera();
    const [cameraName, setCameraName] = useState("");
    const [cameraIP, setCameraIP] = useState("");

    useEffect(() => {
        if (open) {
            setCameraName("");
            setCameraIP("");
        }
    }, [open]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addCamera(
            { cameraName, cameraIP },
            {
                onSuccess: () => {
                    setCameraName("");
                    setCameraIP("");
                    onClose();
                },
            }
        );
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <form onSubmit={handleSubmit} className="w-full max-w-[400px]">
                <div className="w-96 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-bold dark:text-primary-100">
                        Add New Camera
                    </h2>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium dark:text-primary-100">
                            Camera Title
                        </label>
                        <input
                            type="text"
                            name="cameraName"
                            className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100"
                            value={cameraName}
                            onChange={e => setCameraName(e.target.value)}
                            placeholder="Cam 3: Entrance"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium dark:text-primary-100">
                            Video Source
                        </label>
                        <input
                            type="text"
                            name="cameraIP"
                            className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100"
                            value={cameraIP}
                            onChange={e => setCameraIP(e.target.value)}
                            placeholder="Path to video file / RTSP URL"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
                            type="button"
                            onClick={() => {
                                setCameraName("");
                                setCameraIP("");
                                onClose();
                            }}
                            disabled={isPending}>
                            Cancel
                        </button>
                        <button
                            className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600"
                            type="submit"
                            disabled={isPending || !cameraIP || !cameraName}>
                            {isPending ? "Adding..." : "Add Camera"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddCameraModal;
