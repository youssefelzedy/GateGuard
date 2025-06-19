//eslint-disable-next-line
import { motion } from "framer-motion";
import {
    CogIcon,
    EllipsisVerticalIcon,
    LockOpenIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const componentVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 },
};

export default function GateControl() {
    const [isOpen, setIsOpen] = useState(true);

    function handleClick(action) {
        if (action === "open" && !isOpen) {
            setIsOpen(true);
        } else if (action === "close" && isOpen) {
            setIsOpen(false);
        }
    }

    return (
        <motion.div
            className="rounded-lg bg-white shadow-sm transition-colors duration-300 dark:bg-gray-800"
            initial="hidden"
            animate="visible"
            variants={componentVariants}
        >
            <div className="flex items-center justify-between rounded-t-lg bg-blue-50 px-4 py-3 dark:bg-blue-900">
                <div className="flex items-center gap-2">
                    <CogIcon className="h-5 w-5 text-primary-500" />
                    <h3 className="text-lg font-semibold text-primary-950 dark:text-primary-100">
                        Gate Control
                    </h3>
                </div>
                <EllipsisVerticalIcon className="h-5 w-5 text-slate-500 dark:text-slate-300" />
            </div>
            <div className="flex flex-col items-center p-4">
                <motion.p
                    className="mb-4 mt-4 text-center text-4xl font-bold text-primary-950 dark:text-primary-100"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {isOpen ? "Open" : "Closed"}
                </motion.p>
                <div className="flex w-full flex-row items-center justify-between gap-8">
                    <motion.button
                        className={`rounded-md border border-slate-200 px-6 py-2 text-sm font-medium shadow-sm transition-colors dark:border-slate-700 ${
                            isOpen
                                ? "cursor-not-allowed bg-slate-100 text-slate-400 dark:bg-gray-700 dark:text-slate-500"
                                : "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                        }`}
                        onClick={() => handleClick("open")}
                        disabled={isOpen}
                        variants={buttonVariants}
                        whileHover={!isOpen ? "hover" : ""}
                        whileTap={!isOpen ? "tap" : ""}
                    >
                        <LockOpenIcon className="mr-2 inline-block h-5 w-5" />
                        Open
                    </motion.button>
                    <motion.button
                        className={`rounded-md px-6 py-2 text-sm font-medium shadow-sm transition-colors ${
                            !isOpen
                                ? "cursor-not-allowed bg-slate-300 text-white dark:bg-gray-700"
                                : "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                        }`}
                        onClick={() => handleClick("close")}
                        disabled={!isOpen}
                        variants={buttonVariants}
                        whileHover={isOpen ? "hover" : ""}
                        whileTap={isOpen ? "tap" : ""}
                    >
                        <LockClosedIcon className="mr-2 inline-block h-5 w-5" />
                        Close
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
