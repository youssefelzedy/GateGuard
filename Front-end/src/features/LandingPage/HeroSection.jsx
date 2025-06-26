// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

function HeroSection() {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Animation variants
    const h1Variants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                staggerChildren: 0.15,
            },
        },
        hover: {
            scale: 1.03,
            textShadow: "0px 4px 24px rgba(37,99,235,0.25)",
            transition: { duration: 0.2 },
        },
    };
    const spanVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i = 1) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
        }),
        hover: {
            scale: 1.08,
            textShadow: "0px 2px 16px rgba(59,130,246,0.35)",
            transition: { duration: 0.2 },
        },
    };
    const pVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.7, duration: 0.7, ease: "easeOut" },
        },
        hover: {
            scale: 1.02,
            color: "#fff",
            textShadow: "0px 2px 16px rgba(59,130,246,0.25)",
            transition: { duration: 0.2 },
        },
    };

    return (
        <section className="relative z-10 mt-8 flex min-h-screen flex-col items-center justify-center px-4 text-center text-white">
            <motion.h1
                className="text-5xl font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-8xl"
                initial="hidden"
                animate="visible"
                variants={h1Variants}
                whileHover="hover"
            >
                <motion.span
                    className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent"
                    variants={spanVariants}
                    custom={1}
                    whileHover="hover"
                >
                    Automate
                </motion.span>{" "}
                <motion.span
                    className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    variants={spanVariants}
                    custom={2}
                    whileHover="hover"
                >
                    your
                </motion.span>
                <br />
                <motion.span
                    className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent"
                    variants={spanVariants}
                    custom={3}
                    whileHover="hover"
                >
                    Garage Gate
                </motion.span>
            </motion.h1>

            <motion.p
                className="mt-8 max-w-3xl text-base font-medium text-gray-200 drop-shadow-lg sm:text-lg md:text-xl"
                initial="hidden"
                animate="visible"
                variants={pVariants}
                whileHover="hover"
            >
                Secure, automated access control for your garage. Monitor,
                manage, and control entry with advanced license plate
                recognition.
            </motion.p>

            <motion.div
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                <motion.a
                    href="#features"
                    className="rounded-lg bg-primary-500 px-8 py-4 text-base font-semibold text-white shadow-lg ring-2 ring-primary-400/30 transition hover:bg-primary-400 hover:ring-primary-500/60 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Learn more
                </motion.a>
                <motion.a
                    href="/get-started"
                    className="rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:border-primary-500 hover:bg-white hover:text-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Get Started
                </motion.a>
            </motion.div>

            <motion.div
                className="mt-8 w-full max-w-screen-xl"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            >
                {!imageLoaded && (
                    <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gray-800/50">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
                    </div>
                )}
                <img
                    src="/Dashboard.png"
                    alt="GateGuard Dashboard Interface"
                    className={`h-auto w-full rounded-xl shadow-xl transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"} hidden lg:block`}
                    onLoad={() => setImageLoaded(true)}
                />
            </motion.div>

            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                <motion.div
                    className="h-10 w-6 rounded-full border-2 border-white p-1"
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                >
                    <motion.div
                        className="h-2 w-1 rounded-full bg-white"
                        animate={{
                            y: [0, 10, 0],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default HeroSection;
