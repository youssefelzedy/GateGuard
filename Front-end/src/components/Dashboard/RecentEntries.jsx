//eslint-disable-next-line
import { motion } from "framer-motion";
import { useAdmin } from "../../features/auth/useAdmin";
import { useLogs } from "../../features/logsPage/useLogs";
import Plate from "../../ui/Plate";
import { Calendar, Clock } from "lucide-react";

// Enhanced row animation variants
const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.1,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
};

function RecentEntries() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?.id;
    const { logs, isLoading } = useLogs(garageId);

    // Get the latest 3 logs
    const recentLogs = (logs || [])
        .slice()
        .sort((a, b) => new Date(b.accessTime) - new Date(a.accessTime))
        .slice(0, 3);

    return (
        <div className="rounded-lg bg-white shadow-sm transition-colors duration-300 dark:bg-gray-800">
            <div className="flex items-center justify-between rounded-t-lg bg-primary-50 px-4 py-3 dark:bg-primary-900">
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary-500" />
                    <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                        Recent Entries
                    </h3>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-primary-200 bg-primary-50 dark:border-primary-700 dark:bg-primary-900">
                            <th className="px-4 py-3 text-left text-sm font-medium text-primary-900 dark:text-primary-100">
                                No
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-primary-900 dark:text-primary-100">
                                Plate
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-primary-900 dark:text-primary-100">
                                User
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-primary-900 dark:text-primary-100">
                                Date
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-primary-900 dark:text-primary-100">
                                Time
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-primary-900 dark:text-primary-100">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-6 text-center text-gray-400 dark:text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : recentLogs.length > 0 ? (
                            recentLogs.map((log, index) => (
                                <motion.tr
                                    key={log._id}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    variants={rowVariants}
                                    className="border-t border-primary-200 bg-white dark:border-primary-700 dark:bg-gray-800"
                                >
                                    <td className="px-4 py-5">
                                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700 shadow-sm dark:bg-primary-700 dark:text-primary-100">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <Plate
                                            carPlate={log.plateText || "-"}
                                            className="scale-90"
                                        />
                                    </td>
                                    <td className="py-5">
                                        {log.user && log.user.name ? (
                                            <div>
                                                <div className="font-semibold text-gray-800 dark:text-white">
                                                    {log.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {log.user.phoneNumber}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="italic text-gray-400 dark:text-gray-500">
                                                No User Found
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-5 text-primary-600 dark:text-primary-300">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                            <span>
                                                {new Date(
                                                    log.accessTime,
                                                ).toLocaleDateString("en-GB", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-5 text-primary-600 dark:text-primary-300">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-gray-400" />
                                            <span>
                                                {new Date(
                                                    log.accessTime,
                                                ).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <span
                                            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                                                log.action === "Accepted"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                                            }`}
                                        >
                                            {log.action}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-6 text-center text-gray-400 dark:text-gray-500"
                                >
                                    No recent entries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentEntries;
