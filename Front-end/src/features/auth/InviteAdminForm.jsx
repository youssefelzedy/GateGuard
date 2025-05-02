import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import StepNavigation from "../../components/InviteAdminForm/StepNavigation";
import FormButtons from "../../components/InviteAdminForm/FormButtons";
import AdminInfoStep from "../../components/InviteAdminForm/AdminInfoStep";
import AccountStep from "../../components/InviteAdminForm/AccountStep";

function InviteAdminForm() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onSubmit",
        shouldFocusError: true,
    });

    const handleStepClick = async (itemIndex) => {
        setHasInteracted(true);
        let valid = true;

        if (activeIndex === 0) {
            const password = watch("password");
            const confirmPassword = watch("confirmPassword");
            valid = !!password && !!confirmPassword;
            if (!valid) {
                await trigger(["password", "confirmPassword"], {
                    shouldFocus: true,
                });
            }
        } else if (activeIndex === 1) {
            const fullName = watch("fullName");
            const phone = watch("phone");
            const nationalId = watch("nationalId");
            const image = watch("image");
            valid = !!fullName && !!phone && !!nationalId && !!image;
            if (!valid) {
                await trigger(["fullName", "phone", "nationalId", "image"], {
                    shouldFocus: true,
                });
            }
        }

        if (valid) {
            setActiveIndex(itemIndex);
            setHasInteracted(false);
        }
    };

    const inputClass =
        "w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

    const onSubmit = async (data) => {
        setIsSubmitted(true);
        setHasInteracted(true);
        const isStep2Valid = await trigger([
            "fullName",
            "phone",
            "nationalId",
            "image",
        ]);
        if (isStep2Valid) {
            console.log(data);
            // Post data to backend here!
        } else {
            console.log("Step 2 validation failed");
        }
    };

    const shouldShowError = (error) =>
        (hasInteracted || isSubmitted) &&
        (error?.type === "required" || isSubmitted) &&
        error;

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
            <StepNavigation
                activeIndex={activeIndex}
                handleStepClick={handleStepClick}
            />

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
                            <AccountStep
                                register={register}
                                errors={errors}
                                shouldShowError={shouldShowError}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                showConfirmPassword={showConfirmPassword}
                                setShowConfirmPassword={setShowConfirmPassword}
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
                                shouldShowError={shouldShowError}
                                imagePreview={imagePreview}
                                setImagePreview={setImagePreview}
                                inputClass={inputClass}
                                itemVariants={itemVariants}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                <FormButtons
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    isSubmitting={isSubmitting}
                    buttonVariants={buttonVariants}
                />
            </form>
        </motion.div>
    );
}

export default InviteAdminForm;
