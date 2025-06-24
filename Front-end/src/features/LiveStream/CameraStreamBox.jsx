import React, { useRef, useState, useEffect } from "react";
import { FullscreenIcon, Trash2Icon } from "lucide-react";

const CameraStreamBox = ({ cameraIP, cameraName, onRemove }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [streamType, setStreamType] = useState(null);
    const [error, setError] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);

    useEffect(() => {
        const determineStreamType = async () => {
            try {
                const urlLower = cameraIP.toLowerCase();
                if (
                    urlLower.endsWith(".mp4") ||
                    urlLower.endsWith(".webm") ||
                    urlLower.endsWith(".m3u8")
                ) {
                    setStreamType("video");
                    return;
                }
                if (
                    urlLower.includes("mjpeg") ||
                    urlLower.includes("jpg") ||
                    urlLower.includes("jpeg") ||
                    urlLower.includes("videofeed")
                ) {
                    setStreamType("mjpeg");
                    return;
                }
                if (urlLower.startsWith("rtsp://")) {
                    setStreamType("unsupported");
                    setError(
                        "RTSP streams are not supported directly. Use a server-side converter to HLS.",
                    );
                    return;
                }

                try {
                    const response = await fetch(cameraIP, {
                        method: "HEAD",
                        mode: "cors",
                    });
                    const contentType = response.headers
                        .get("content-type")
                        ?.toLowerCase();
                    if (
                        contentType?.includes("video/") ||
                        contentType?.includes("application/vnd.apple.mpegurl")
                    ) {
                        setStreamType("video");
                    } else if (
                        contentType?.includes("multipart/x-mixed-replace") ||
                        contentType?.includes("image/jpeg")
                    ) {
                        setStreamType("mjpeg");
                    } else {
                        if (urlLower.includes("videofeed")) {
                            setStreamType("mjpeg");
                        } else {
                            setStreamType("unsupported");
                            setError("Unsupported stream format.");
                        }
                    }
                } catch (fetchErr) {
                    console.warn("Fetch failed, trying as MJPEG:", fetchErr);
                    if (urlLower.includes("videofeed")) {
                        setStreamType("mjpeg");
                    } else {
                        setStreamType("unsupported");
                        setError(
                            "Failed to fetch stream headers. Check CORS or network.",
                        );
                    }
                }
            } catch (err) {
                console.error("Error determining stream type:", err);
                setStreamType("unsupported");
                setError("Failed to load stream. Check URL, CORS, or network.");
            }
        };

        determineStreamType();
    }, [cameraIP]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () =>
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange,
            );
    }, []);

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await containerRef.current.requestFullscreen();
            }
        } catch (err) {
            setError("Failed to toggle fullscreen. Check browser permissions.");
            console.error("Error toggling fullscreen:", err);
        }
    };

    const VideoControlButton = ({ onClick, icon, disabled, tooltip }) => (
        <button
            onClick={onClick}
            className={`rounded-full bg-white/80 p-2.5 transition-all hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={disabled}
            title={tooltip}
        >
            {icon}
        </button>
    );

    return (
        <div className="font-poppins overflow-hidden rounded-xl border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div
                ref={containerRef}
                className="relative h-[400px] w-full bg-black dark:bg-gray-900"
            >
                {streamType === "video" && (
                    <video
                        ref={videoRef}
                        src={cameraIP}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        playsInline
                        onError={() => setError("Failed to load video stream.")}
                    />
                )}
                {streamType === "mjpeg" && (
                    <img
                        src={cameraIP}
                        alt="MJPEG Stream"
                        className="h-full w-full object-cover"
                        onError={() => setError("Failed to load MJPEG stream.")}
                    />
                )}
                {(streamType === "unsupported" || error) && (
                    <div className="flex h-full w-full items-center justify-center p-4 text-center text-white dark:text-primary-100">
                        <p>{error || "Stream not supported."}</p>
                    </div>
                )}
                {(streamType === "video" || streamType === "mjpeg") &&
                    !error && (
                        <div className="absolute bottom-3 right-3 flex gap-2">
                            <VideoControlButton
                                onClick={toggleFullscreen}
                                icon={
                                    <FullscreenIcon
                                        className={`h-5 w-5 transition-colors ${
                                            isFullscreen
                                                ? "text-primary-500 dark:text-primary-400"
                                                : "text-gray-800"
                                        }`}
                                    />
                                }
                                tooltip={
                                    isFullscreen
                                        ? "Exit fullscreen"
                                        : "Enter fullscreen"
                                }
                            />
                        </div>
                    )}
            </div>
            <div className="flex items-center justify-between p-3 text-sm font-medium text-slate-800 dark:text-primary-100">
                <span>{cameraName}</span>
                {isConfirmingRemove ? (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Are you sure?
                        </span>
                        <button
                            onClick={() => {
                                onRemove();
                                setIsConfirmingRemove(false);
                            }}
                            className="rounded bg-red-500 px-2 py-1 text-xs text-white transition-colors hover:bg-red-600"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => setIsConfirmingRemove(false)}
                            className="rounded bg-gray-200 px-2 py-1 text-xs text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                        >
                            No
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsConfirmingRemove(true)}
                        title="Remove camera"
                        className="ml-2 rounded-full p-1.5 text-red-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <Trash2Icon className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default CameraStreamBox;
