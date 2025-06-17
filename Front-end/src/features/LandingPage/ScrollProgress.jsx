// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-primary-500"
            style={{ scaleX }}
        />
    );
}

export default ScrollProgress;
