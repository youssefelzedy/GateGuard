import { motion, type Variants } from "framer-motion";
import type { MouseEvent } from "react";
import type { UseFormTrigger } from "react-hook-form";
import type { AdminInvitationData } from "../../interfaces/admin.interface";

type FormButtonsProps = {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    buttonVariants: Variants;
    trigger: UseFormTrigger<AdminInvitationData>;
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
        if (activeIndex === 0) {
            valid = await trigger(["data.password", "data.passwordConfirm"]);
        } else if (activeIndex === 1) {
            valid = await trigger([
                "data.name",
                "data.phoneNumber",
                "data.nationalSecurityNumber",
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

            {activeIndex < 1 ? (
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
