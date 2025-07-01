// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useAdmin } from "../auth/useAdmin";

function FloatingCTA() {
    const { isAuth } = useAdmin();
    if (!isAuth) return;
    return (
        <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
        >
            <motion.a
                href="/get-started"
                className="flex items-center gap-3 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 px-8 py-4 text-base font-semibold text-white shadow-xl transition hover:from-primary-500 hover:via-primary-400 hover:to-primary-300 sm:text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <span className="font-semibold">Get Started</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </motion.a>
        </motion.div>
    );
}

export default FloatingCTA;
