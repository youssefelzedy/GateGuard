import {
    CalendarIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

export default function Calendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Calculate the number of days in the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Determine the starting day of the month, adjusted for Monday start
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const startingDay = (firstDayOfMonth + 6) % 7; // Makes Monday = 0, Sunday = 6

    // Array of month names for dynamic display
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const currentMonthName = monthNames[month]; // "May"

    // Generate calendar grid with 35 slots
    const gridSlots = Array.from({ length: 35 }, (_, i) => {
        if (i < startingDay) return ""; // Empty slots before the first day
        const day = i - startingDay + 1;
        return day <= daysInMonth ? day : ""; // Days, then empty slots
    });

    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between rounded-t-lg bg-blue-50 px-4 py-3">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-[#1e293b]">
                        {currentMonthName}
                    </h3>
                </div>
                <EllipsisVerticalIcon className="h-5 w-5 text-slate-500" />
            </div>
            <div className="p-4">
                <div className="grid grid-cols-7 gap-2 text-center">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                        <div
                            key={index}
                            className="text-sm font-medium text-[#64748b]"
                        >
                            {day}
                        </div>
                    ))}
                    {gridSlots.map((day, index) => (
                        <div
                            key={index}
                            className={`flex h-8 items-center justify-center text-sm ${
                                day === today.getDate()
                                    ? "rounded-full bg-blue-500 text-white"
                                    : "text-[#1e293b]"
                            }`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
