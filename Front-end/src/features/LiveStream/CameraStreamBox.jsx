import { useRef, useState, useEffect } from "react";
import Hls from "hls.js";
import { FullscreenIcon, Trash2Icon, Loader2 } from "lucide-react";
import { useDeleteCamera } from "./useDeleteCamera";

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

const CameraStreamBox = ({ camera }) => {
    const { cameraIP, cameraName, _id: cameraId } = camera;
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    const [streamConfig, setStreamConfig] = useState({
        type: "loading",
        url: "",
    });
    const [fallbackAttempt, setFallbackAttempt] = useState(false);
    const [error, setError] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);

    const { deleteCamera } = useDeleteCamera();

    useEffect(() => {
        const sanitizedUrl = cameraIP.trim().replace(/^@/, "");
        setStreamConfig({ type: "loading", url: "" });
        setError(null);
        setFallbackAttempt(false);

        const urlLower = sanitizedUrl.toLowerCase();

        if (urlLower.endsWith(".m3u8")) {
            setStreamConfig({ type: "hls", url: sanitizedUrl });
        } else if (urlLower.endsWith(".mp4") || urlLower.endsWith(".webm")) {
            setStreamConfig({ type: "video", url: sanitizedUrl });
        } else if (
            urlLower.includes("mjpeg") ||
            urlLower.includes("jpg") ||
            urlLower.includes("jpeg") ||
            urlLower.includes("videofeed")
        ) {
            setStreamConfig({ type: "mjpeg", url: sanitizedUrl });
        } else if (urlLower.startsWith("rtsp://")) {
            setStreamConfig({ type: "unsupported", url: sanitizedUrl });
            setError(
                "RTSP streams are not directly supported. Use a converter to HLS.",
            );
        } else {
            setStreamConfig({ type: "unknown", url: sanitizedUrl });
        }
    }, [cameraIP]);

    useEffect(() => {
        if (
            streamConfig.type === "hls" &&
            Hls.isSupported() &&
            videoRef.current
        ) {
            const hls = new Hls();
            hls.loadSource(streamConfig.url);
            hls.attachMedia(videoRef.current);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current.play().catch(() => {
                    console.warn("Autoplay was prevented by the browser.");
                });
            });
            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    setError(`HLS Error: ${data.details}`);
                    console.error("HLS fatal error:", data);
                }
            });
            return () => hls.destroy();
        }
    }, [streamConfig]);

    useEffect(() => {
        const handleFullscreenChange = () =>
            setIsFullscreen(!!document.fullscreenElement);
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

    const handleDelete = () => {
        deleteCamera(cameraId, {
            onSuccess: () => {
                setIsConfirmingRemove(false);
                setError(null);
            },
        });
    };

    const handleVideoError = () => {
        if (streamConfig.type === "unknown" && !fallbackAttempt) {
            setFallbackAttempt(true);
        } else {
            setError(`Failed to load video stream.`);
        }
    };

    const handleImageError = () => {
        setError(
            "Could not load stream. Check URL, CORS, or network settings.",
        );
    };

    const renderStream = () => {
        if (streamConfig.type === "loading") {
            return (
                <div className="flex h-full w-full items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-white" />
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex h-full w-full items-center justify-center p-4 text-center text-white dark:text-primary-100">
                    <p>{error}</p>
                </div>
            );
        }

        if (streamConfig.type === "unknown") {
            if (!fallbackAttempt) {
                return (
                    <video
                        ref={videoRef}
                        src={streamConfig.url}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        playsInline
                        onError={handleVideoError}
                    />
                );
            } else {
                return (
                    <img
                        src={streamConfig.url}
                        alt="MJPEG Stream"
                        className="h-full w-full object-cover"
                        onError={handleImageError}
                    />
                );
            }
        }

        switch (streamConfig.type) {
            case "hls":
            case "video":
                return (
                    <video
                        ref={videoRef}
                        src={
                            streamConfig.type === "video"
                                ? streamConfig.url
                                : undefined
                        }
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        playsInline
                        onError={handleVideoError}
                    />
                );
            case "mjpeg":
                return (
                    <img
                        src={streamConfig.url}
                        alt="MJPEG Stream"
                        className="h-full w-full object-cover"
                        onError={handleImageError}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="font-poppins overflow-hidden rounded-xl border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div
                ref={containerRef}
                className="relative h-[400px] w-full bg-black dark:bg-gray-900"
            >
                {renderStream()}
                {!error && (
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
                            onClick={handleDelete}
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
