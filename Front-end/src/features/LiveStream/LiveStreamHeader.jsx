import { Calendar, Clock, Video } from "lucide-react";
import { useAdmin } from "../auth/useAdmin";

function LiveStreamHeader({ onAddCamera }) {
    const { isOwner } = useAdmin();

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
    return (
        <header className="flex flex-row justify-between">
            <div className="flex flex-col items-center gap-1 p-2">
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary-800 dark:text-primary-200" />
                    <span
                        className="text-lg font-semibold text-primary-900 dark:text-primary-100"
                        aria-label="Current date"
                    >
                        {formatted}
                    </span>
                    <span className="mx-2 text-primary-400 dark:text-primary-500">
                        •
                    </span>
                    <Clock className="h-5 w-5 text-primary-800 dark:text-primary-200" />
                    <span
                        className="text-lg font-medium text-primary-700 dark:text-primary-100"
                        aria-label="Current time"
                    >
                        {timeNow}
                    </span>
                </div>
            </div>
            {isOwner && (
                <button
                    className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 px-5 py-2 shadow-lg transition-all duration-300 hover:from-primary-700 hover:to-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 dark:from-primary-700 dark:to-primary-600 dark:hover:from-primary-800 dark:hover:to-primary-700"
                    onClick={onAddCamera}
                >
                    <Video className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
                    <span className="font-sans text-base font-semibold tracking-wide text-white">
                        Add Camera
                    </span>
                </button>
            )}
        </header>
    );
}

export default LiveStreamHeader;
