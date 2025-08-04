import { useState } from "react";
import { useAdmin } from "../features/auth/useAdmin";
import CameraStreamBox from "../features/liveStream/CameraStreamBox";
import AddCameraModal from "../features/liveStream/AddCameraModal";
import LiveStreamHeader from "../features/liveStream/LiveStreamHeader";
import { useCameras } from "../features/liveStream/useCameras";
import type { Camera } from "../interfaces/camera.interface";

function LiveStream() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?._id;
    const { cameras } = useCameras(garageId!);
    const [AddCamera, setAddCamera] = useState(false);

    return (
        <div className="flex h-full flex-col bg-primary-50 p-10 transition-colors duration-300 dark:bg-gray-900">
            <LiveStreamHeader onAddCamera={() => setAddCamera(true)} />
            <p className="mb-2 text-base text-primary-900/50 dark:text-primary-100/60">
                Here you can view and manage recent car entries.
            </p>
            <div className="grid grid-cols-2 gap-4">
                {cameras?.map((camera: Camera) => (
                    <CameraStreamBox key={camera._id} camera={camera} />
                ))}
            </div>
            {/* Modal for adding a camera */}
            <AddCameraModal
                open={AddCamera}
                onClose={() => setAddCamera(false)}
            />
        </div>
    );
}

export default LiveStream;
