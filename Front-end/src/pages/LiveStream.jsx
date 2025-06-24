import { useState } from "react";
import { useAdmin } from "../features/auth/useAdmin";
import { useCameras } from "../features/LiveStream/useCameras";
import CameraStreamBox from "../features/LiveStream/CameraStreamBox";
import AddCameraModal from "../features/LiveStream/AddCameraModal";
import LiveStreamHeader from "../features/LiveStream/LiveStreamHeader";

function LiveStream() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?.id;
    const { cameras } = useCameras(garageId);
    const [AddCamera, setAddCamera] = useState(false);

    return (
        <div className="flex h-full flex-col bg-primary-50 p-10 transition-colors duration-300 dark:bg-gray-900">
            <LiveStreamHeader onAddCamera={() => setAddCamera(true)} />
            <p className="mb-2 text-base text-primary-900/50 dark:text-primary-100/60">
                Here you can view and manage recent car entries.
            </p>
            <div className="grid grid-cols-2 gap-4">
                {cameras?.map((camera) => (
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
