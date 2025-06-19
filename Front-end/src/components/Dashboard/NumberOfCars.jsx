//eslint-disable-next-line
import { motion } from "framer-motion";
import { TruckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const countVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, delay: 0.2, ease: "easeOut" },
    },
};

export default function NumberOfCars() {
    return (
        <motion.div
            className="rounded-lg bg-white shadow-sm transition-colors duration-300 dark:bg-gray-800"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex items-center justify-between rounded-t-lg bg-primary-50 px-4 py-3 dark:bg-primary-900">
                <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                    Number of Cars
                </h3>
                <EllipsisVerticalIcon className="h-5 w-5 text-primary-500" />
            </div>
            <div className="p-4 text-center">
                <div className="mb-3 flex items-center justify-center gap-3">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <TruckIcon className="h-7 w-7 text-primary-500" />
                    </motion.div>
                    <motion.p
                        className="text-4xl font-bold text-primary-900 dark:text-primary-100"
                        variants={countVariants}
                    >
                        20 cars
                    </motion.p>
                </div>
                <motion.div
                    className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span>↑</span>
                    <span>25% from yesterday</span>
                </motion.div>
            </div>
        </motion.div>
    );
}
