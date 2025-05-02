// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FormButtons = ({
    activeIndex,
    setActiveIndex,
    setHasInteracted,
    isSubmitting,
    buttonVariants,
}) => {
    return (
        <div className="mt-6 flex justify-between space-x-4">
            {activeIndex > 0 && (
                <motion.button
                    type="button"
                    onClick={() => {
                        setActiveIndex(activeIndex - 1);
                        setHasInteracted(false);
                    }}
                    className="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-300"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                >
                    Back
                </motion.button>
            )}

            {activeIndex < 2 ? (
                <motion.button
                    type="button"
                    onClick={() => {
                        setActiveIndex(activeIndex + 1);
                        setHasInteracted(true);
                    }}
                    className="ml-auto rounded-md bg-primary-700 px-4 py-2 font-medium text-white transition-all hover:bg-primary-800"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                >
                    Next
                </motion.button>
            ) : (
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`ml-auto rounded-md bg-primary-700 px-4 py-2 font-medium text-white transition-all hover:bg-primary-800 ${
                        isSubmitting ? "cursor-not-allowed opacity-70" : ""
                    }`}
                    whileHover={!isSubmitting ? "hover" : {}}
                    whileTap={!isSubmitting ? "tap" : {}}
                    variants={buttonVariants}
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg
                                className="-ml-1 mr-2 h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Submitting...
                        </span>
                    ) : (
                        "Register"
                    )}
                </motion.button>
            )}
        </div>
    );
};

export default FormButtons;
