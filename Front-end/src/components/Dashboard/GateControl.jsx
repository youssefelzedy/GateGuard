//eslint-disable-next-line
import { motion } from "framer-motion";
import { CogIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
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
            className="rounded-lg bg-white shadow-sm"
            initial="hidden"
            animate="visible"
            variants={componentVariants}
        >
            <div className="flex items-center justify-between rounded-t-lg bg-blue-50 px-4 py-3">
                <div className="flex items-center gap-2">
                    <CogIcon className="h-5 w-5 text-primary-500" />
                    <h3 className="text-lg font-semibold text-primary-950">
                        Gate Control
                    </h3>
                </div>
                <EllipsisVerticalIcon className="h-5 w-5 text-slate-500" />
            </div>
            <div className="flex flex-col items-center p-4">
                <motion.p
                    className="mb-4 mt-4 text-center text-4xl font-bold text-primary-950"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {isOpen ? "Open" : "Closed"}
                </motion.p>
                <div className="flex flex-row items-center justify-center gap-52">
                    <motion.button
                        className={`rounded-md border border-slate-200 ${isOpen ? "bg-slate-100 text-slate-400" : "bg-white text-primary-950"} px-4 py-2 text-sm font-medium shadow-sm`}
                        onClick={() => handleClick("open")}
                        disabled={isOpen}
                        variants={buttonVariants}
                        whileHover={!isOpen ? "hover" : ""}
                        whileTap={!isOpen ? "tap" : ""}
                    >
                        Open
                    </motion.button>
                    <motion.button
                        className={`rounded-md ${!isOpen ? "bg-slate-300" : "bg-primary-800"} px-4 py-2 text-sm font-medium text-white shadow-sm`}
                        onClick={() => handleClick("close")}
                        disabled={!isOpen}
                        variants={buttonVariants}
                        whileHover={isOpen ? "hover" : ""}
                        whileTap={isOpen ? "tap" : ""}
                    >
                        Close
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
