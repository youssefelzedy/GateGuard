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
            className="rounded-lg bg-white shadow-sm"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="flex items-center justify-between rounded-t-lg bg-blue-50 px-4 py-3">
                <h3 className="text-lg font-semibold text-[#1e293b]">
                    Number of Cars
                </h3>
                <EllipsisVerticalIcon className="h-5 w-5 text-slate-500" />
            </div>
            <div className="p-4 text-center">
                <div className="mb-2 flex items-center justify-center gap-3">
                    <motion.div>
                        <TruckIcon className="h-6 w-6 text-blue-500" />
                    </motion.div>
                    <motion.p
                        className="items-center text-4xl font-bold text-[#1e293b]"
                        variants={countVariants}
                    >
                        20 cars
                    </motion.p>
                </div>
                <motion.div
                    className="inline-flex items-center rounded-full bg-[#3b82f6] px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                    animate="pulse"
                >
                    ↑ 25% from yesterday
                </motion.div>
            </div>
        </motion.div>
    );
}
