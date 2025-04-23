import React, { useRef, useState, useEffect } from "react";
import { FullscreenIcon, Volume2Icon, VolumeXIcon } from "lucide-react";

const CameraStreamBox = ({ cameraTitle, cameraSrc }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasAudio, setHasAudio] = useState(false);
    const [streamType, setStreamType] = useState(null);
    const [error, setError] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Determine stream type
    useEffect(() => {
        const determineStreamType = async () => {
            try {
                const urlLower = cameraSrc.toLowerCase();
                // Check URL patterns
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
                    urlLower.includes("videofeed") // Handle 'videofeed' as MJPEG
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

                // Try fetching headers, but fallback if it fails
                try {
                    const response = await fetch(cameraSrc, {
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
                        // Fallback to MJPEG for 'videofeed' if headers are unclear
                        if (urlLower.includes("videofeed")) {
                            setStreamType("mjpeg");
                        } else {
                            setStreamType("unsupported");
                            setError("Unsupported stream format.");
                        }
                    }
                } catch (fetchErr) {
                    console.warn("Fetch failed, trying as MJPEG:", fetchErr);
                    // Fallback to MJPEG for 'videofeed' URLs
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
    }, [cameraSrc]);

    // Check for audio track in video streams
    useEffect(() => {
        if (streamType === "video" && videoRef.current) {
            const videoElement = videoRef.current;
            const checkAudio = () => {
                setHasAudio(
                    videoElement.mozHasAudio ||
                        Boolean(videoElement.webkitAudioDecodedByteCount) ||
                        false,
                );
            };
            videoElement.addEventListener("loadedmetadata", checkAudio);
            return () =>
                videoElement.removeEventListener("loadedmetadata", checkAudio);
        }
    }, [streamType]);

    // Track fullscreen state
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

    const toggleMute = () => {
        if (!videoRef.current || streamType !== "video") return;
        try {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        } catch (err) {
            setError("Failed to toggle mute.");
            console.error("Error toggling mute:", err);
        }
    };

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
        <div className="font-poppins overflow-hidden rounded-xl border bg-white shadow-md">
            <div ref={containerRef} className="relative h-64 w-full bg-black">
                {streamType === "video" && (
                    <video
                        ref={videoRef}
                        src={cameraSrc}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        playsInline
                        onError={() => setError("Failed to load video stream.")}
                    />
                )}
                {streamType === "mjpeg" && (
                    <img
                        src={cameraSrc}
                        alt="MJPEG Stream"
                        className="h-full w-full object-cover"
                        onError={() => setError("Failed to load MJPEG stream.")}
                    />
                )}
                {(streamType === "unsupported" || error) && (
                    <div className="flex h-full w-full items-center justify-center p-4 text-center text-white">
                        <p>{error || "Stream not supported."}</p>
                    </div>
                )}
                {(streamType === "video" || streamType === "mjpeg") &&
                    !error && (
                        <div className="absolute bottom-3 right-3 flex gap-2">
                            {streamType === "video" && (
                                <VideoControlButton
                                    onClick={toggleMute}
                                    icon={
                                        isMuted ? (
                                            <VolumeXIcon className="h-5 w-5 text-gray-800" />
                                        ) : (
                                            <Volume2Icon className="h-5 w-5 text-gray-800" />
                                        )
                                    }
                                    disabled={!hasAudio}
                                    tooltip={
                                        hasAudio
                                            ? isMuted
                                                ? "Unmute"
                                                : "Mute"
                                            : "No audio available"
                                    }
                                />
                            )}
                            <VideoControlButton
                                onClick={toggleFullscreen}
                                icon={
                                    <FullscreenIcon
                                        className={`h-5 w-5 transition-colors ${
                                            isFullscreen
                                                ? "text-blue-500"
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
            <div className="p-3 text-sm font-medium text-slate-800">
                {cameraTitle}
            </div>
        </div>
    );
};

export default CameraStreamBox;
