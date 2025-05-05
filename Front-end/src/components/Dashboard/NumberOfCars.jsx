import { TruckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export default function NumberOfCars() {
    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between rounded-t-lg bg-blue-50 px-4 py-3">
                <h3 className="text-lg font-semibold text-[#1e293b]">
                    Number of Cars
                </h3>
                <EllipsisVerticalIcon className="h-5 w-5 text-slate-500" />
            </div>
            <div className="p-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-3">
                    <TruckIcon className="h-6 w-6 text-blue-500" />
                    <p className="items-center text-4xl font-bold text-[#1e293b]">
                        20 cars
                    </p>
                </div>
                <div className="inline-flex items-center rounded-full bg-[#3b82f6] px-3 py-1.5 text-sm font-semibold text-white shadow-sm">
                    ↑ 25% from yesterday
                </div>
            </div>
        </div>
    );
}
