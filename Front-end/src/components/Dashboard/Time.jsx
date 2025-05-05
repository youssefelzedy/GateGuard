import { ClockIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function Time() {
    const timeNow = new Date()
        .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
        .toLowerCase();
    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between rounded-t-lg bg-blue-50 px-4 py-3">
                <h3 className="text-lg font-semibold text-[#1e293b]">
                    Current Time
                </h3>
                <EllipsisVerticalIcon className="h-5 w-5 text-slate-500" />
            </div>
            <div className="p-4">
                <div className="flex items-center justify-center gap-3">
                    <ClockIcon className="h-6 w-6 text-blue-500" />
                    <p className="items-center text-4xl font-bold text-[#1e293b]">
                        {timeNow}
                    </p>
                </div>
            </div>
        </div>
    );
}
