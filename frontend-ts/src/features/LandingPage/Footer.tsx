import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import logoLight from "../../assets/Logo_light.svg";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmail("");
    };

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
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                    <div className="flex flex-col items-center md:items-start">
                        <motion.div
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0}
                            viewport={{ once: true }}
                            className="mb-6">
                            <a href="#" className="flex items-center">
                                <img
                                    src={logoLight}
                                    alt="GateGuard Logo"
                                    className="mr-3 h-auto w-24 md:w-32"
                                />
                            </a>
                        </motion.div>
                        <motion.p
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0.2}
                            viewport={{ once: true }}
                            className="mb-2 text-center text-base sm:text-left sm:text-lg">
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
                            className="text-sm text-gray-400 sm:text-base">
                            All rights reserved.
                        </motion.p>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                        <motion.h3
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0}
                            viewport={{ once: true }}
                            className="mb-8 text-xl font-bold sm:text-2xl">
                            Want to know more about our solution?
                        </motion.h3>
                        <motion.p
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0.1}
                            viewport={{ once: true }}
                            className="mb-4 text-base sm:text-lg">
                            Provide us your email and we will contact you.
                        </motion.p>
                        <motion.form
                            variants={fadeInVariants}
                            initial="hidden"
                            whileInView="visible"
                            custom={0.2}
                            viewport={{ once: true }}
                            onSubmit={handleSubmit}
                            className="flex w-full flex-col space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0">
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                                className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:px-6 sm:py-3 sm:text-base"
                            />
                            <motion.button
                                type="submit"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="w-full rounded-lg bg-primary-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-600 sm:w-auto sm:px-8 sm:py-3 sm:text-base">
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
