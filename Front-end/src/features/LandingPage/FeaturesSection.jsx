//eslint-disable-next-line
import { motion } from "framer-motion";

function FeaturesSection() {
    return (
        <section
            id="features"
            className="relative z-20 w-full bg-white px-6 py-24"
        >
            <div className="mx-auto max-w-7xl">
                {/* Section Title */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center text-5xl font-bold text-primary-500"
                >
                    Featu<span className="text-primary-800">res</span>
                </motion.h2>

                {/* Features Container */}
                <div className="flex flex-col gap-32">
                    {/* Feature 1 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:flex-row md:items-start md:justify-between"
                    >
                        {/* Text and Icon */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative max-w-md text-center md:text-left"
                        >
                            <h3 className="flex flex-col text-6xl font-extrabold leading-snug text-primary-900">
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
                            <p className="mt-8 text-xl text-gray-600">
                                Be aware of every vehicle that entered the
                                garage, manage employee & visitor access
                                efficiently.
                            </p>
                        </motion.div>

                        {/* Screenshot */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-10 md:mt-0"
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
                                className="h-auto w-[650px] rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:flex-row-reverse md:items-start md:justify-between"
                    >
                        {/* Text and Icon */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative max-w-md text-center md:text-left"
                        >
                            <h3 className="flex flex-col text-6xl font-extrabold leading-snug text-primary-900">
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
                            <p className="mt-8 text-xl text-gray-600">
                                Control who has access to your garage, automate
                                entry & reduce security risks.
                            </p>
                        </motion.div>

                        {/* Screenshot */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-10 md:mt-0"
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
                                className="h-auto w-[650px] rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center md:flex-row md:items-start md:justify-between"
                    >
                        {/* Text and Icon */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative max-w-md text-center md:text-left"
                        >
                            <h3 className="flex flex-col text-6xl font-extrabold leading-snug text-primary-900">
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
                            <p className="mt-8 text-xl text-gray-600">
                                Using the live stream feature, keep an eye on
                                the garage gate 24/7, with the ability to add
                                other cameras.
                            </p>
                        </motion.div>

                        {/* Screenshot */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="mt-10 md:mt-0"
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
                                className="h-auto w-[650x] rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
