import { CogIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function GateControl() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between rounded-t-lg bg-blue-50 px-4 py-3">
                <div className="flex items-center gap-2">
                    <CogIcon className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-primary-950">
                        Gate Control
                    </h3>
                </div>
                <EllipsisVerticalIcon className="h-5 w-5 text-slate-500" />
            </div>
            <div className="flex flex-col items-center p-4">
                <p className="mb-4 mt-4 text-center text-4xl font-bold text-primary-950">
                    {isOpen ? "Open" : "Closed"}
                </p>
                <div className="flex flex-row items-center justify-center gap-52">
                    <button
                        className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-primary-950 shadow-sm hover:bg-slate-50"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Open
                    </button>
                    <button
                        className="rounded-md bg-[#1d4ed8] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-800"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
