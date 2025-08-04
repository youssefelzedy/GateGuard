import { motion, type Variants } from "framer-motion";
import { TruckIcon } from "@heroicons/react/24/outline";
import { useAdmin } from "../../features/auth/useAdmin";
import { useLogs } from "../../features/logsPage/useLogs";
import { isSameDay, subDays } from "date-fns";

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const countVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, delay: 0.2, ease: "easeOut" },
    },
};

export default function NumberOfCars() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?._id;
    const { logs } = useLogs(garageId!);

    // Calculate number of accepted cars today and yesterday
    let todayCount = 0;
    let yesterdayCount = 0;
    if (logs && Array.isArray(logs)) {
        const today = new Date();
        const yesterday = subDays(today, 1);
        logs.forEach(log => {
            if (log.action === "Accepted" && log.accessTime) {
                const logDate = new Date(log.accessTime);
                if (isSameDay(logDate, today)) {
                    todayCount++;
                } else if (isSameDay(logDate, yesterday)) {
                    yesterdayCount++;
                }
            }
        });
    }
    // Calculate percentage change
    let percentChange = 0;
    if (yesterdayCount === 0 && todayCount > 0) {
        percentChange = 100;
    } else if (yesterdayCount > 0) {
        percentChange = Math.round(
            ((todayCount - yesterdayCount) / yesterdayCount) * 100
        );
    }

    return (
        <motion.div
            className="rounded-lg bg-white shadow-sm transition-colors duration-300 dark:bg-gray-800"
            initial="hidden"
            animate="visible"
            variants={containerVariants}>
            <div className="flex items-center justify-between rounded-t-lg bg-primary-50 px-4 py-3 dark:bg-primary-900">
                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                    Number of Cars
                </h3>
            </div>
            <div className="p-4 text-center">
                <div className="mb-3 flex items-center justify-center gap-3">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}>
                        <TruckIcon className="h-7 w-7 text-primary-500" />
                    </motion.div>
                    <motion.p
                        className="text-4xl font-bold text-primary-900 dark:text-primary-100"
                        variants={countVariants}>
                        {todayCount} cars
                    </motion.p>
                </div>
                <motion.div
                    className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}>
                    <span>{percentChange >= 0 ? "↑" : "↓"}</span>
                    <span>{Math.abs(percentChange)}% from yesterday</span>
                </motion.div>
            </div>
        </motion.div>
    );
}
