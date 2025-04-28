import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        setEmail("");
    };

    // Variants
    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (customDelay = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: customDelay },
        }),
    };

    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    };

    return (
        <footer className="bg-primary-900 py-16 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Logo and Made with love section */}
                    <div className="flex flex-col">
                        <motion.div
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0}
                            viewport={{ once: true }}
                            className="mb-6"
                        >
                            <a href="#" className="flex items-center">
                                <img
                                    src="/Logo.svg"
                                    alt="GateGuard Logo"
                                    width={150}
                                    height={150}
                                    className="mr-3"
                                />
                            </a>
                        </motion.div>

                        <motion.p
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0.2}
                            viewport={{ once: true }}
                            className="mb-2 text-sm"
                        >
                            Made with <span className="text-red-500">❤</span>{" "}
                            by Computer and Control Students,
                            <br />
                            Faculty of Engineering, Port Said University.
                        </motion.p>

                        <motion.p
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0.3}
                            viewport={{ once: true }}
                            className="text-sm text-gray-400"
                        >
                            All rights reserved.
                        </motion.p>
                    </div>

                    {/* Support Links */}
                    <div className="flex flex-col">
                        <motion.h3
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0}
                            viewport={{ once: true }}
                            className="mb-6 text-2xl font-bold"
                        >
                            Support
                        </motion.h3>

                        <motion.div
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0.1}
                            viewport={{ once: true }}
                            className="flex flex-col space-y-4"
                        >
                            <a
                                href="/help"
                                className="transition-colors hover:text-primary-300"
                            >
                                Help center
                            </a>
                            <a
                                href="/terms"
                                className="transition-colors hover:text-primary-300"
                            >
                                Terms of service
                            </a>
                            <a
                                href="/legal"
                                className="transition-colors hover:text-primary-300"
                            >
                                Legal
                            </a>
                            <a
                                href="/privacy"
                                className="transition-colors hover:text-primary-300"
                            >
                                Privacy policy
                            </a>
                            <a
                                href="/status"
                                className="transition-colors hover:text-primary-300"
                            >
                                Status
                            </a>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <div className="flex flex-col">
                        <motion.h3
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0}
                            viewport={{ once: true }}
                            className="mb-6 text-2xl font-bold"
                        >
                            Want to know more about our solution?
                        </motion.h3>

                        <motion.p
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0.1}
                            viewport={{ once: true }}
                            className="mb-4 text-sm"
                        >
                            Provide us your email and we will contact you.
                        </motion.p>

                        <motion.form
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0.2}
                            viewport={{ once: true }}
                            onSubmit={handleSubmit}
                            className="flex flex-col space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="rounded bg-gray-200 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <motion.button
                                type="submit"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="rounded bg-primary-500 px-6 py-2 font-medium text-white transition-colors hover:bg-primary-600"
                            >
                                Send
                            </motion.button>
                        </motion.form>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
