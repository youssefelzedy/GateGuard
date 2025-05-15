// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

import AdminSteps from "../../components/InviteAdminForm/AdminSteps";
import PasswordsSteps from "../../components/InviteAdminForm/PasswordsSteps";
import AdminInfoStep from "../../components/RegisterAdminForm/AdminInfoStep";
import FormButtons from "../../components/InviteAdminForm/FormButtons";
import { useParams } from "react-router";
import { useAcceptAdmin } from "./useAcceptAdmin";

function InviteAdminForm() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { token } = useParams();
    const { acceptInvitation, backError } = useAcceptAdmin();
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        shouldFocusError: true,
    });

    const inputClass = (field) =>
        `w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
            errors[field]
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : ""
        }`;

    const onSubmit = async (data) => {
        const isStep2Valid =
            (await trigger([
                "name",
                "phoneNumber",
                "nationalSecurityNumber",
            ])) &&
            data.name &&
            data.phoneNumber &&
            data.nationalSecurityNumber;
        if (isStep2Valid) {
            console.log(data);
            acceptInvitation({ data, token });
        } else {
            console.log("Step 2 validation failed");
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
        exit: { y: -20, opacity: 0 },
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            className="card mx-auto w-full max-w-xl rounded-md bg-white p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AdminSteps activeIndex={activeIndex} />

            <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                    {activeIndex === 0 ? (
                        <motion.div
                            key="step1"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <PasswordsSteps
                                watch={watch}
                                register={register}
                                errors={errors}
                                inputClass={inputClass}
                                itemVariants={itemVariants}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <AdminInfoStep
                                register={register}
                                errors={errors}
                                inputClass={inputClass}
                                itemVariants={itemVariants}
                                backError={backError}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <FormButtons
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    trigger={trigger}
                    buttonVariants={buttonVariants}
                />
            </form>
        </motion.div>
    );
}

export default InviteAdminForm;
