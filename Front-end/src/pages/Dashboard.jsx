//eslint-disable-next-line
import { motion } from "framer-motion";
import Graph from "../components/Dashboard/Graph";
import RecentEntries from "../components/Dashboard/RecentEntries";
import GateControl from "../components/Dashboard/GateControl";
import Time from "../components/Dashboard/Time";
import Calendar from "../components/Dashboard/Calendar";
import NumberOfCars from "../components/Dashboard/NumberOfCars";

// Enhanced variants for dashboard items
const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 80,
            damping: 15,
            duration: 0.5,
        },
    },
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

function Dashboard() {
    return (
        <div className="grid min-h-screen grid-cols-[3fr_1fr] gap-6 bg-primary-100 p-6 transition-colors duration-300 dark:bg-gray-900">
            <motion.div
                className="flex flex-col gap-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <Graph />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <RecentEntries />
                </motion.div>
            </motion.div>

            <motion.div
                className="flex flex-col gap-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <GateControl />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <NumberOfCars />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Time />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Calendar />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Dashboard;
