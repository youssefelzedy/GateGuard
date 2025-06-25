// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function FeaturesSection() {
    return (
        <section
            id="features"
            className="relative z-20 w-full bg-white px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center text-2xl font-bold text-primary-500 sm:text-3xl md:text-4xl lg:text-5xl"
                >
                    Featu<span className="text-primary-800">res</span>
                </motion.h2>
                <div className="flex flex-col gap-16 md:gap-24 lg:gap-32">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:flex-row md:items-start md:justify-between"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative max-w-md text-center md:text-left"
                        >
                            <h3 className="flex flex-col text-3xl font-extrabold leading-snug text-primary-900 sm:text-4xl md:text-5xl lg:text-6xl">
                                Stay{" "}
                                <span className="italic text-primary-500">
                                    Informed
                                </span>
                            </h3>
                            <motion.img
                                initial={{ rotate: -10, scale: 0.9 }}
                                whileInView={{ rotate: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                src="/features/arrow-down-arrow-up.png"
                                alt=""
                                className="absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 opacity-20 md:left-0 md:translate-x-0"
                            />
                            <p className="mt-6 text-sm text-gray-600 sm:text-base md:text-lg lg:text-xl">
                                Be aware of every vehicle that entered the
                                garage, manage employee & visitor access
                                efficiently.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-10 md:ml-8 md:mt-4"
                        >
                            <motion.img
                                whileHover={{ scale: 1.03 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                                src="/feature-1.png"
                                alt="Feature 1 Screenshot"
                                className="h-auto w-full max-w-[400px] rounded-xl shadow-xl md:max-w-[450px] lg:max-w-[650px]"
                                loading="lazy"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:flex-row-reverse md:items-start md:justify-between"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative max-w-md text-center md:text-left"
                        >
                            <h3 className="flex flex-col text-3xl font-extrabold leading-snug text-primary-900 sm:text-4xl md:text-5xl lg:text-6xl">
                                Stay{" "}
                                <span className="italic text-primary-500">
                                    In Control
                                </span>
                            </h3>
                            <motion.img
                                initial={{ rotate: 10, scale: 0.9 }}
                                whileInView={{ rotate: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                src="/features/users-group-alt.png"
                                alt=""
                                className="absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 opacity-20 md:left-0 md:translate-x-0"
                            />
                            <p className="mt-6 text-sm text-gray-600 sm:text-base md:text-lg lg:text-xl">
                                Control who has access to your garage, automate
                                entry & reduce security risks.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-10 md:mr-8 md:mt-4"
                        >
                            <motion.img
                                whileHover={{ scale: 1.03 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                                src="/feature-2.png"
                                alt="Feature 2 Screenshot"
                                className="h-auto w-full max-w-[400px] rounded-xl shadow-xl md:max-w-[450px] lg:max-w-[650px]"
                                loading="lazy"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:flex-row md:items-start md:justify-between"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative max-w-md text-center md:text-left"
                        >
                            <h3 className="flex flex-col text-3xl font-extrabold leading-snug text-primary-900 sm:text-4xl md:text-5xl lg:text-6xl">
                                Stay{" "}
                                <span className="italic text-primary-500">
                                    Vigilant
                                </span>
                            </h3>
                            <motion.img
                                initial={{ rotate: -10, scale: 0.9 }}
                                whileInView={{ rotate: 0, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                src="/features/video-square.png"
                                alt=""
                                className="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 opacity-20 md:left-0 md:translate-x-0"
                            />
                            <p className="mt-6 text-sm text-gray-600 sm:text-base md:text-lg lg:text-xl">
                                Using the live stream feature, keep an eye on
                                the garage gate 24/7, with the ability to add
                                other cameras.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-10 md:ml-8 md:mt-4"
                        >
                            <motion.img
                                whileHover={{ scale: 1.03 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10,
                                }}
                                src="/feature-3.png"
                                alt="Feature 3 Screenshot"
                                className="h-auto w-full max-w-[400px] rounded-xl shadow-xl md:max-w-[450px] lg:max-w-[650px]"
                                loading="lazy"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;

<section className="mb-8 bg-white pt-0 text-primary-950 md:mb-16 md:pt-16">
    <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-primary-500 sm:text-3xl md:mb-16 md:text-4xl lg:text-5xl">
            Features
        </h2>
    </div>
</section>;
