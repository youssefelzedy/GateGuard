// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import React, { useState, useEffect, useMemo } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import c1 from "../../assets/Slider/c1.jpg";
import c2 from "../../assets/Slider/c2.jpg";
import c3 from "../../assets/Slider/c3.jpg";

function Slider() {
    const slides = useMemo(
        () => [
            {
                image: c1,
                title: "Enterprise Security",
                description:
                    "Our advanced security solutions protect large enterprises with seamless integration and real-time monitoring capabilities.",
            },
            {
                image: c2,
                title: "Residential Protection",
                description:
                    "Providing peace of mind for homeowners with smart access control and visitor management systems.",
            },
            {
                image: c3,
                title: "Commercial Security",
                description:
                    "Tailored security solutions for businesses of all sizes, ensuring safety while maintaining operational efficiency.",
            },
        ],
        [],
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 10 * 1000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
        );
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
            <div className="container mx-auto px-4">
                <div className="hidden md:block">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-2 text-center text-4xl font-bold text-primary-900"
                    >
                        Should you be our{" "}
                        <span className="text-primary-400">client?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mb-4 text-center text-xl text-primary-900"
                    >
                        Who will benefit the most from our services?
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="relative mx-auto max-w-5xl overflow-hidden rounded-lg shadow-xl"
                    >
                        <div className="bg-pattern absolute inset-0 z-0 opacity-5"></div>
                        <div className="relative h-[300px] overflow-hidden rounded-lg sm:h-[400px] md:h-[500px]">
                            <motion.div
                                className="flex h-full"
                                animate={{ x: `-${currentIndex * 100}%` }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    duration: 0.7,
                                }}
                            >
                                {slides.map((slide, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative h-full min-w-full flex-shrink-0"
                                        initial={{ opacity: 0.8 }}
                                        animate={{
                                            opacity:
                                                index === currentIndex
                                                    ? 1
                                                    : 0.8,
                                            scale:
                                                index === currentIndex
                                                    ? 1
                                                    : 0.95,
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 p-8 text-white"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{
                                                y:
                                                    index === currentIndex
                                                        ? 0
                                                        : 20,
                                                opacity:
                                                    index === currentIndex
                                                        ? 1
                                                        : 0,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.2,
                                            }}
                                        >
                                            <motion.h3
                                                className="mb-2 text-2xl font-bold"
                                                initial={{ y: 10 }}
                                                animate={{ y: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.3,
                                                }}
                                            >
                                                {slide.title}
                                            </motion.h3>
                                            <motion.p
                                                className="max-w-2xl text-lg"
                                                initial={{ y: 10 }}
                                                animate={{ y: 0 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.4,
                                                }}
                                            >
                                                {slide.description}
                                            </motion.p>
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                        <motion.button
                            onClick={handlePrev}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: "rgba(37, 99, 235, 0.95)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-primary-900 p-3 text-white shadow-lg transition-all"
                            aria-label="Previous slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </motion.button>
                        <motion.button
                            onClick={handleNext}
                            whileHover={{
                                scale: 1.1,
                                backgroundColor: "rgba(37, 99, 235, 0.95)",
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-primary-900 p-3 text-white shadow-lg transition-all"
                            aria-label="Next slide"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </motion.button>
                        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2">
                            {slides.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`h-2 rounded-full transition-all ${
                                        index === currentIndex
                                            ? "w-8 bg-primary-600"
                                            : "w-2 bg-white/70 hover:bg-white"
                                    }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Slider;
