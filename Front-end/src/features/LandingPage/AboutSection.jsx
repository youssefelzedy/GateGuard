// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function AboutSection() {
    return (
        <div id="about" className="bg-white py-16">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
                {/* First Feature Row */}
                <motion.div
                    className="mb-24 flex flex-col items-start justify-between md:flex-row md:items-center md:space-x-8 lg:space-x-16"
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
                    {/* Text Content */}
                    <motion.div
                        className="mb-12 md:mb-0 md:w-1/2 lg:pr-8"
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
                        <motion.h3
                            className="mb-2 text-5xl font-bold text-primary-950"
                            custom={0}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: (custom) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 12,
                                        delay: custom * 0.1 + 0.2,
                                    },
                                }),
                            }}
                        >
                            Extra{" "}
                            <motion.span
                                className="italic text-primary-500"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 10,
                                        delay: 0.5,
                                    },
                                }}
                                viewport={{ once: true }}
                            >
                                Security
                            </motion.span>
                        </motion.h3>
                        <motion.p
                            className="mb-4 text-xl font-medium text-gray-700"
                            custom={1}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: (custom) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 12,
                                        delay: custom * 0.1 + 0.2,
                                    },
                                }),
                            }}
                        >
                            for restricted access facilities.
                        </motion.p>
                        <motion.p
                            className="mb-4 text-lg text-gray-600"
                            custom={2}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: (custom) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 12,
                                        delay: custom * 0.1 + 0.2,
                                    },
                                }),
                            }}
                        >
                            Designed to ensure the utmost protection, our system
                            utilizes
                            <motion.span
                                className="font-medium italic"
                                initial={{ opacity: 0, y: 5 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 0.8 },
                                }}
                                viewport={{ once: true }}
                            >
                                {" "}
                                license plate recognition
                            </motion.span>{" "}
                            technology to grant seamless, vehicle-specific
                            access. For added security, we incorporate a second
                            layer of authentication by sending a{" "}
                            <motion.span
                                className="font-medium"
                                initial={{ opacity: 0, y: 5 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 1 },
                                }}
                                viewport={{ once: true }}
                            >
                                One-Time Password
                            </motion.span>{" "}
                            (OTP) to a registered device or email.
                        </motion.p>
                        <motion.p
                            className="text-base text-gray-600"
                            custom={3}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: (custom) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 12,
                                        delay: custom * 0.1 + 0.2,
                                    },
                                }),
                            }}
                        >
                            This dual-factor authentication ensures that only
                            authorized individuals can enter, making it ideal
                            for government buildings, research labs, data
                            centers, and other sensitive sites.
                        </motion.p>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="flex justify-end md:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
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
                            src="/about/otp2.png"
                            alt="Security features on mobile device"
                            className="h-auto w-auto max-w-[400px] drop-shadow-xl"
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
                </motion.div>

                {/* Second Feature Row (Reversed) */}
                <motion.div
                    className="mb-24 flex flex-col-reverse items-start justify-between md:flex-row md:items-center md:space-x-8 lg:space-x-16"
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
                    {/* Image */}
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
                            className="h-auto w-auto max-w-[400px] drop-shadow-xl"
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

                    {/* Text Content */}
                    <motion.div
                        className="mb-12 md:mb-0 md:w-1/2 lg:pl-8"
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
                        <motion.h3
                            className="mb-2 text-4xl font-bold text-primary-950"
                            custom={0}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: (custom) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 12,
                                        delay: custom * 0.1 + 0.2,
                                    },
                                }),
                            }}
                        >
                            Let your employees do the{" "}
                            <motion.span
                                className="italic text-primary-500"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 10,
                                        delay: 0.5,
                                    },
                                }}
                                viewport={{ once: true }}
                            >
                                boring work!
                            </motion.span>
                        </motion.h3>
                        <motion.p
                            className="mb-4 text-lg text-gray-600"
                            custom={1}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: (custom) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 12,
                                        delay: custom * 0.1 + 0.2,
                                    },
                                }),
                            }}
                        >
                            Skip the manual work! Employees and vehicle owners
                            enter their own car details, while admins simply
                            review and approve, saving time, effort, and
                            eliminating tedious data entry.
                        </motion.p>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
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
                        className="mb-6 text-4xl font-bold text-gray-800"
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
                            className="text-primary-500"
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
                        className="inline-block rounded bg-primary-800 px-6 py-3 text-base font-medium text-white shadow-md transition-all hover:bg-primary-700"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
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
