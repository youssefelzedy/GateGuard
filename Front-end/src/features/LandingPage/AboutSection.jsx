// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ShieldIcon from "/public/Shield.svg";

function AboutSection() {
    // Helper for animated background blobs
    const AnimatedBlob = ({
        className,
        colorFrom,
        colorTo,
        duration = 8,
        delay = 0,
    }) => (
        <motion.div
            className={`absolute ${className} z-0 rounded-full opacity-20 blur-2xl`}
            style={{
                background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
            }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 30, 0] }}
            transition={{
                repeat: Infinity,
                duration,
                delay,
                ease: "easeInOut",
            }}
        />
    );
    return (
        <div
            id="about"
            className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20 dark:from-gray-900 dark:via-gray-950 dark:to-primary-900"
        >
            <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
                {/* Section Title */}
                <motion.h2
                    className="mb-16 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-center text-4xl font-extrabold text-transparent drop-shadow-lg md:text-5xl"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    About <span className="text-primary-700">GateGuard</span>
                </motion.h2>
                {/* Illustration and intro */}
                <motion.div
                    className="mb-20 flex flex-col-reverse items-center justify-between md:flex-row md:items-center md:space-x-12 lg:space-x-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.3,
                            },
                        },
                    }}
                >
                    <motion.div
                        className="flex justify-start md:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                type: "spring",
                                stiffness: 50,
                                damping: 15,
                                duration: 0.8,
                            },
                        }}
                        viewport={{ once: true }}
                    >
                        <motion.img
                            src="/about/otp1.png"
                            alt="Employee using the app"
                            className="h-auto w-full max-w-[400px] drop-shadow-xl"
                            initial="hidden"
                            whileInView="visible"
                            whileHover="hover"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, scale: 0.8 },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15,
                                        duration: 0.8,
                                    },
                                },
                                hover: {
                                    scale: 1.05,
                                    rotate: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 15,
                                    },
                                },
                            }}
                        />
                    </motion.div>
                    <motion.div
                        className="mb-12 md:mb-0 md:w-1/2 lg:pl-8"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 18,
                            duration: 1,
                            delay: 0.2,
                        }}
                        viewport={{ once: true }}
                    >
                        <motion.h3
                            className="mb-4 text-3xl font-extrabold tracking-tight text-primary-950 md:text-4xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Let your employees do the{" "}
                            <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text italic text-primary-500 text-transparent">
                                boring work!
                            </span>
                        </motion.h3>
                        <motion.p
                            className="mb-4 text-lg text-gray-700 dark:text-gray-200 sm:text-xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            Skip the manual work! Employees and vehicle owners
                            enter their own car details, while admins simply
                            review and approve, saving time, effort, and
                            eliminating tedious data entry.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Divider */}
                <div className="mb-16 flex w-full justify-center">
                    <div className="h-1 w-32 animate-pulse rounded-full bg-gradient-to-r from-primary-400 via-primary-200 to-primary-600 opacity-60"></div>
                </div>

                {/* How GateGuard Works Section */}
                <motion.div
                    className="relative mx-auto mb-20 max-w-4xl overflow-hidden rounded-3xl border border-primary-100 bg-white/80 px-6 py-14 shadow-2xl backdrop-blur-2xl dark:border-primary-800 dark:bg-primary-900/60"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className="relative z-10 mb-12 animate-pulse bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-center text-3xl font-extrabold tracking-tight text-primary-900 text-transparent dark:text-primary-100 sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        How GateGuard Works
                    </motion.h3>
                    <div className="relative z-10 grid gap-12 sm:grid-cols-3">
                        {/* Step 1: Register */}
                        <motion.div
                            className="relative flex flex-col items-center overflow-visible rounded-2xl border border-primary-100 bg-white/95 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-primary-800 dark:bg-primary-900/70"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.2,
                                duration: 0.7,
                                type: "spring",
                                bounce: 0.4,
                            }}
                            whileHover={{
                                scale: 1.09,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                            viewport={{ once: true }}
                        >
                            <motion.img
                                src="/features/arrow-down-arrow-up.png"
                                alt="Register"
                                className="mb-4 h-16 w-16 animate-float object-contain drop-shadow-xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                viewport={{ once: true }}
                            />
                            <h4 className="mb-2 text-lg font-bold tracking-wide text-primary-900 drop-shadow-sm dark:text-primary-100">
                                Register
                            </h4>
                            <p className="px-2 text-center text-sm text-gray-700 dark:text-gray-200">
                                Users and vehicles are registered quickly and
                                securely through our intuitive platform.
                            </p>
                        </motion.div>
                        {/* Step 2: Verify */}
                        <motion.div
                            className="relative flex flex-col items-center overflow-visible rounded-2xl border border-primary-100 bg-white/95 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-primary-800 dark:bg-primary-900/70"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.7,
                                type: "spring",
                                bounce: 0.4,
                            }}
                            whileHover={{
                                scale: 1.09,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                            viewport={{ once: true }}
                        >
                            <motion.img
                                src="/features/users-group-alt.png"
                                alt="Verify"
                                className="mb-4 h-16 w-16 animate-float object-contain drop-shadow-xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                viewport={{ once: true }}
                            />
                            <h4 className="mb-2 text-lg font-bold tracking-wide text-primary-900 drop-shadow-sm dark:text-primary-100">
                                Verify
                            </h4>
                            <p className="px-2 text-center text-sm text-gray-700 dark:text-gray-200">
                                Admins review and approve access, ensuring only
                                authorized vehicles can enter.
                            </p>
                        </motion.div>
                        {/* Step 3: Access */}
                        <motion.div
                            className="relative flex flex-col items-center overflow-visible rounded-2xl border border-primary-100 bg-white/95 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-primary-800 dark:bg-primary-900/70"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.4,
                                duration: 0.7,
                                type: "spring",
                                bounce: 0.4,
                            }}
                            whileHover={{
                                scale: 1.09,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                            viewport={{ once: true }}
                        >
                            <motion.img
                                src="/features/video-square.png"
                                alt="Access"
                                className="mb-4 h-16 w-16 animate-float object-contain drop-shadow-xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                viewport={{ once: true }}
                            />
                            <h4 className="mb-2 text-lg font-bold tracking-wide text-primary-900 drop-shadow-sm dark:text-primary-100">
                                Access
                            </h4>
                            <p className="px-2 text-center text-sm text-gray-700 dark:text-gray-200">
                                Seamless, automated entry with license plate
                                recognition and real-time monitoring.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Divider */}
                <div className="mb-16 flex w-full justify-center">
                    <div className="h-1 w-32 animate-pulse rounded-full bg-gradient-to-r from-primary-400 via-primary-200 to-primary-600 opacity-60"></div>
                </div>

                {/* Why Choose GateGuard Section */}
                <motion.div
                    className="relative mx-auto mb-20 max-w-5xl overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-primary-100 px-6 py-14 shadow-2xl backdrop-blur-xl dark:border-primary-800 dark:from-gray-900 dark:via-gray-950 dark:to-primary-900"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h3
                        className="relative z-10 mb-12 animate-pulse bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-center text-3xl font-extrabold tracking-tight text-primary-900 text-transparent dark:text-primary-100 sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Why Choose GateGuard?
                    </motion.h3>
                    <div className="relative z-10 grid gap-10 sm:grid-cols-4">
                        {/* Feature 1: Fast & Automated */}
                        <motion.div
                            className="relative flex flex-col items-center overflow-visible rounded-2xl border border-primary-100 bg-white/95 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-primary-800 dark:bg-primary-900/70"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.2,
                                duration: 0.7,
                                type: "spring",
                                bounce: 0.4,
                            }}
                            whileHover={{
                                scale: 1.09,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                            viewport={{ once: true }}
                        >
                            <motion.img
                                src="/features/arrow-down-arrow-up.png"
                                alt="Fast & Automated"
                                className="mb-4 h-14 w-14 animate-float object-contain drop-shadow-xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                viewport={{ once: true }}
                            />
                            <h4 className="mb-1 text-base font-semibold tracking-wide text-primary-900 drop-shadow-sm dark:text-primary-100">
                                Fast & Automated
                            </h4>
                            <p className="px-2 text-center text-xs text-gray-700 dark:text-gray-200">
                                Instant access and approvals, reducing wait
                                times and manual work.
                            </p>
                        </motion.div>
                        {/* Feature 2: Real-Time Alerts */}
                        <motion.div
                            className="relative flex flex-col items-center overflow-visible rounded-2xl border border-primary-100 bg-white/95 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-primary-800 dark:bg-primary-900/70"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.3,
                                duration: 0.7,
                                type: "spring",
                                bounce: 0.4,
                            }}
                            whileHover={{
                                scale: 1.09,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                            viewport={{ once: true }}
                        >
                            <motion.img
                                src="/features/users-group-alt.png"
                                alt="Real-Time Alerts"
                                className="mb-4 h-14 w-14 animate-float object-contain drop-shadow-xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                viewport={{ once: true }}
                            />
                            <h4 className="mb-1 text-base font-semibold tracking-wide text-primary-900 drop-shadow-sm dark:text-primary-100">
                                Real-Time Alerts
                            </h4>
                            <p className="px-2 text-center text-xs text-gray-700 dark:text-gray-200">
                                Stay informed with instant notifications for
                                every entry and event.
                            </p>
                        </motion.div>
                        {/* Feature 3: Top-Tier Security */}
                        <motion.div
                            className="relative flex flex-col items-center overflow-visible rounded-2xl border border-primary-100 bg-white/95 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-primary-800 dark:bg-primary-900/70"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.4,
                                duration: 0.7,
                                type: "spring",
                                bounce: 0.4,
                            }}
                            whileHover={{
                                scale: 1.09,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                            viewport={{ once: true }}
                        >
                            <motion.img
                                src="/Shield.svg"
                                alt="Top-Tier Security"
                                className="mb-4 h-14 w-14 animate-float object-contain drop-shadow-xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.4 }}
                                viewport={{ once: true }}
                            />
                            <h4 className="mb-1 text-base font-semibold tracking-wide text-primary-900 drop-shadow-sm dark:text-primary-100">
                                Top-Tier Security
                            </h4>
                            <p className="px-2 text-center text-xs text-gray-700 dark:text-gray-200">
                                Advanced encryption and authentication keep your
                                facility safe.
                            </p>
                        </motion.div>
                        {/* Feature 4: Insightful Analytics */}
                        <motion.div
                            className="relative flex flex-col items-center overflow-visible rounded-2xl border border-primary-100 bg-white/95 p-6 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-primary-800 dark:bg-primary-900/70"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.7,
                                type: "spring",
                                bounce: 0.4,
                            }}
                            whileHover={{
                                scale: 1.09,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                            }}
                            viewport={{ once: true }}
                        >
                            <motion.img
                                src="/feature-3.png"
                                alt="Insightful Analytics"
                                className="mb-4 h-14 w-14 animate-float object-contain drop-shadow-xl"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.5 }}
                                viewport={{ once: true }}
                            />
                            <h4 className="mb-1 text-base font-semibold tracking-wide text-primary-900 drop-shadow-sm dark:text-primary-100">
                                Insightful Analytics
                            </h4>
                            <p className="px-2 text-center text-xs text-gray-700 dark:text-gray-200">
                                Track usage, trends, and security events with
                                powerful reporting tools.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
                <motion.div
                    className="mx-auto max-w-3xl text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            type: "spring",
                            stiffness: 50,
                            damping: 15,
                            duration: 0.8,
                        },
                    }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="mb-6 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl md:text-5xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 10,
                                delay: 0.2,
                            },
                        }}
                        viewport={{ once: true }}
                    >
                        Are you{" "}
                        <motion.span
                            className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-primary-500 text-transparent"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 10,
                                    delay: 0.5,
                                },
                            }}
                            viewport={{ once: true }}
                        >
                            convinced?
                        </motion.span>
                    </motion.h2>
                    <motion.a
                        href="/signup"
                        className="inline-block rounded-full bg-gradient-to-r from-primary-700 to-primary-500 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:from-primary-800 hover:to-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-300"
                        whileHover={{
                            scale: 1.08,
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 10,
                                delay: 0.7,
                            },
                        }}
                        viewport={{ once: true }}
                    >
                        Get Started
                    </motion.a>
                </motion.div>
            </div>
        </div>
    );
}

export default AboutSection;
