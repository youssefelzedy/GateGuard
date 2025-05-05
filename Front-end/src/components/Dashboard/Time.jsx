//eslint-disable-next-line
import { motion } from "framer-motion";
import { ClockIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Time() {
    const [timeNow, setTimeNow] = useState(
        new Date()
            .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
            .toLowerCase(),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTimeNow(
                now
                    .toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    })
                    .toLowerCase(),
            );
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="rounded-lg bg-white shadow-md transition-shadow duration-500 hover:shadow-xl"
            initial={{ opacity: 0, scale: 0.8, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.div
                className="flex items-center justify-between rounded-t-lg bg-blue-50 px-4 py-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            >
                <motion.h3
                    className="text-lg font-semibold text-[#1e293b]"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                >
                    Current Time
                </motion.h3>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.4, ease: "backOut" }}
                >
                    <EllipsisVerticalIcon className="h-5 w-5 text-slate-500" />
                </motion.div>
            </motion.div>
            <motion.div
                className="p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            >
                <motion.div
                    className="flex flex-col items-center justify-center gap-2"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
                >
                    <motion.div
                        className="flex items-center gap-3"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2.4,
                            ease: "easeInOut",
                        }}
                    >
                        <ClockIcon className="h-6 w-6 text-blue-500" />
                        <motion.p
                            className="text-4xl font-bold text-[#1e293b]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.4 }}
                        >
                            {timeNow}
                        </motion.p>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
