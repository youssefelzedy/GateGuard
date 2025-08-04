import { motion, type Variants } from "framer-motion";
import type { UseFormTrigger } from "react-hook-form";
import type { RegistrationData } from "../../interfaces/auth.interface";
import type { MouseEvent } from "react";

type FormButtonsProps = {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    buttonVariants: Variants;
    trigger: UseFormTrigger<RegistrationData>;
};

const FormButtons = ({
    activeIndex,
    setActiveIndex,
    buttonVariants,
    trigger,
}: FormButtonsProps) => {
    const handleNext = async (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        let valid = false;

        // Trigger validation based on the current step
        if (activeIndex === 0) {
            valid = await trigger(["email", "password", "passwordConfirm"]);
        } else if (activeIndex === 1) {
            valid = await trigger([
                "name",
                "phoneNumber",
                "nationalSecurityNumber",
            ]);
        } else {
            valid = true;
        }

        if (valid) {
            setActiveIndex(activeIndex + 1);
        }
    };

    return (
        <div className="mt-6 flex justify-between space-x-4">
            {activeIndex > 0 && (
                <motion.button
                    type="button"
                    onClick={() => setActiveIndex(activeIndex - 1)} // No validation for "Back"
                    className="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 transition-all hover:bg-gray-300"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}>
                    Back
                </motion.button>
            )}

            {activeIndex < 2 ? (
                <motion.button
                    type="button"
                    onClick={e => handleNext(e)}
                    className="ml-auto rounded-md bg-primary-700 px-4 py-2 font-medium text-white transition-all hover:bg-primary-800"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}>
                    Next
                </motion.button>
            ) : (
                <motion.button
                    type="submit"
                    className={`ml-auto rounded-md bg-primary-700 px-4 py-2 font-medium text-white transition-all hover:bg-primary-800`}
                    variants={buttonVariants}>
                    Submit
                </motion.button>
            )}
        </div>
    );
};

export default FormButtons;
