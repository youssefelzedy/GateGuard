//eslint-disable-next-line
import { motion } from "framer-motion";
import { useAdmin } from "../../features/auth/useAdmin";
import { useUsers } from "../../features/users/useUsers";
import Plate from "../../ui/Plate";
import { Clock } from "lucide-react";

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
    const { users } = useUsers(admin?.garage.id);

    const recentUsers = [...(users || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
                                Time
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-primary-900 dark:text-primary-100">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentUsers.map((user, index) => (
                            <motion.tr
                                key={index}
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
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <Plate
                                                carPlate={user?.carPlate || "-"}
                                                className="scale-90"
                                            />
                                            <div className="mt-1 text-xs text-primary-400 dark:text-primary-300">
                                                Garage:{" "}
                                                {user?.garage?.name || "1"}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td className="py-5 text-primary-600 dark:text-primary-300">
                                    {new Date().toLocaleTimeString()}
                                </td>

                                <td className="py-5">
                                    {user.status === "accept" ? (
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-700 dark:text-green-100">
                                            Accept
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-700 dark:text-red-100">
                                            Denied
                                        </span>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentEntries;
