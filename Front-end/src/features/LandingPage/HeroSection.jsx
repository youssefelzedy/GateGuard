// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Variants for the headline to stagger children animations
const headlineVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

// Variants for each child element in the headline
const childVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function HeroSection() {
    return (
        <section className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center text-white">
            <motion.h1
                variants={headlineVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl font-bold sm:text-5xl md:text-8xl"
            >
                <motion.span
                    variants={childVariants}
                    className="bg-gradient-to-r from-primary-400 to-white bg-clip-text text-transparent"
                >
                    Automate
                </motion.span>{" "}
                <motion.span variants={childVariants}>your</motion.span> <br />
                <motion.span variants={childVariants}>Garage Gate</motion.span>
            </motion.h1>
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.8,
                }}
                className="mt-8 rounded bg-primary-500 px-6 py-3 text-lg text-white transition hover:bg-primary-400"
            >
                Learn more
            </motion.button>
            <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                className="mt-12 w-full max-w-screen-xl"
            >
                <img
                    src="/Dashboard.png"
                    alt="Hero"
                    className="h-auto w-full rounded-lg shadow-lg"
                />
            </motion.div>
        </section>
    );
}

export default HeroSection;
