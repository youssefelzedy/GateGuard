import { useState } from "react";
import CameraStreamBox from "../features/StreamLive/CameraStreamBox";

function LiveStream() {
    const initialCameras = [];

    const [cameras, setCameras] = useState(initialCameras);
    const [AddCamera, setAddCamera] = useState(false);
    const [newCamera, setNewCamera] = useState({
        title: "",
        src: "",
        muted: false,
    });

    const getFormattedDate = (date) => {
        const d = new Date(date);
        const day = d.getDate();
        const suffix =
            day > 3 && day < 21
                ? "th"
                : ["st", "nd", "rd"][(day % 10) - 1] || "th";
        return `${day}${suffix} ${d.toLocaleString("en-GB", { month: "long" })}, ${d.getFullYear()}`;
    };

    const formatted = getFormattedDate(Date.now());
    const timeNow = new Date()
        .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .toLowerCase();

    const handleAddCamera = () => {
        setCameras([
            ...cameras,
            {
                id: cameras.length + 1,
                ...newCamera,
            },
        ]);
        setNewCamera({ title: "", src: "", muted: false });
        setAddCamera(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewCamera({
            ...newCamera,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    return (
        <div className="flex h-full flex-col gap-4 bg-primary-50 p-10">
            <header className="flex flex-row justify-between">
                <div>
                    <h1 className="text-2xl font-bold capitalize text-primary-900">
                        {formatted}
                    </h1>
                    <h1 className="text-2xl font-bold capitalize text-primary-900">
                        {timeNow}
                    </h1>
                </div>

                <button
                    className="group flex h-10 w-[201px] cursor-pointer items-center justify-center gap-2 rounded-full bg-primary-600 px-3 py-2 transition-all duration-300 hover:bg-primary-400"
                    onClick={() => setAddCamera(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="group-hover:animate-[slope_1s_linear_infinite]"
                    >
                        <path
                            d="M16 10L23 7V17L16 14"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <rect
                            x="2"
                            y="6"
                            width="14"
                            height="12"
                            rx="2"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="font-sans text-[17px] leading-[22px] tracking-wider text-white">
                        Add Camera
                    </span>
                </button>
            </header>

            <p className="text-base text-primary-900/50">
                Here you can view and manage recent car entries.
            </p>

            <div className="grid grid-cols-2 gap-4">
                {cameras.map((camera) => (
                    <CameraStreamBox
                        key={camera.id}
                        cameraTitle={camera.title}
                        cameraSrc={camera.src}
                        muted={camera.muted}
                    />
                ))}
            </div>

            {AddCamera && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-bold">
                            Add New Camera
                        </h2>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium">
                                Camera Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="w-full rounded border border-gray-300 p-2"
                                value={newCamera.title}
                                onChange={handleInputChange}
                                placeholder="e.g. Cam 3: Entrance"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium">
                                Video Source
                            </label>
                            <input
                                type="text"
                                name="src"
                                className="w-full rounded border border-gray-300 p-2"
                                value={newCamera.src}
                                onChange={handleInputChange}
                                placeholder="Path to video file"
                            />
                        </div>

                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="muted"
                                name="muted"
                                checked={newCamera.muted}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label
                                htmlFor="muted"
                                className="text-sm font-medium"
                            >
                                Muted
                            </label>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                                onClick={() => setAddCamera(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-500"
                                onClick={handleAddCamera}
                                disabled={!newCamera.title || !newCamera.src}
                            >
                                Add Camera
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LiveStream;
