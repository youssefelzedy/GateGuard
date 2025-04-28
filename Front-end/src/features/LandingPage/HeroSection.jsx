import { motion } from "framer-motion";

function HeroSection() {
    return (
        <section className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center text-white">
            {/* Headline */}
            <motion.h1
                className="text-4xl font-bold sm:text-5xl md:text-8xl"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 },
                    },
                }}
            >
                <motion.span
                    className="bg-gradient-to-r from-primary-400 to-white bg-clip-text text-transparent"
                    variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5 },
                        },
                    }}
                >
                    Automate
                </motion.span>{" "}
                <motion.span
                    variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5 },
                        },
                    }}
                >
                    your
                </motion.span>
                <br />
                <motion.span
                    variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5 },
                        },
                    }}
                >
                    Garage Gate
                </motion.span>
            </motion.h1>

            {/* CTA Button */}
            <motion.button
                className="mt-8 rounded bg-primary-500 px-6 py-3 text-lg text-white transition hover:bg-primary-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.8,
                }}
            >
                Learn more
            </motion.button>

            {/* Hero Image */}
            <motion.div
                className="mt-12 w-full max-w-screen-xl"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{
                    duration: 1,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
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
