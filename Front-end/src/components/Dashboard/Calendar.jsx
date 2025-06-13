// eslint-disable-next-line
import { motion } from "framer-motion";
import {
    CalendarIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

const dayVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.02,
            type: "spring",
            stiffness: 120,
            damping: 12,
        },
    }),
};

export default function Calendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startingDay = (firstDayOfMonth + 6) % 7;

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
    const currentMonthName = monthNames[month];

    const gridSlots = Array.from({ length: 35 }, (_, i) => {
        if (i < startingDay) return "";
        const day = i - startingDay + 1;
        return day <= daysInMonth ? day : "";
    });

    return (
        <div className="rounded-lg bg-white shadow-sm">
            <div className="flex items-center justify-between rounded-t-lg bg-primary-50 px-4 py-3">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary-500" />
                    <h3 className="text-lg font-semibold text-primary-900">
                        {currentMonthName}
                    </h3>
                </div>
                <EllipsisVerticalIcon className="h-5 w-5 text-primary-500" />
            </div>
            <div className="p-4">
                <div className="grid grid-cols-7 gap-3 text-center">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                        <div
                            key={index}
                            className="text-sm font-medium text-primary-600"
                        >
                            {day}
                        </div>
                    ))}
                    {gridSlots.map((day, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={dayVariants}
                            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all duration-300 ${
                                day === today.getDate()
                                    ? "bg-primary-600 text-white shadow-lg ring-2 ring-primary-200"
                                    : day
                                      ? "text-primary-900 hover:bg-primary-50"
                                      : "text-transparent"
                            }`}
                        >
                            {day}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
