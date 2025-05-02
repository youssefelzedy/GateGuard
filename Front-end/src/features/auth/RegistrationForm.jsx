import { useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

// Import components
import StepNavigation from "../../components/RegisterAdminForm/StepNavigation";
import AccountStep from "../../components/RegisterAdminForm/AccountStep";
import AdminInfoStep from "../../components/RegisterAdminForm/AdminInfoStep";
import GarageInfoStep from "../../components/RegisterAdminForm/GarageInfoStep";
import FormButtons from "../../components/RegisterAdminForm/FormButtons";

function RegistrationStepper() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        control,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onSubmit",
        shouldFocusError: true,
    });

    const inputClass =
        "w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

    const handleStepClick = async (itemIndex) => {
        let valid = false;

        if (activeIndex === 0) {
            const email = watch("email");
            const password = watch("password");
            const confirmPassword = watch("confirmPassword");
            valid = !!email && !!password && !!confirmPassword;
            if (!valid) {
                await trigger(["email", "password", "confirmPassword"], {
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
        } else if (activeIndex === 2) {
            const garageName = watch("garageName");
            const location = watch("location");
            const agree = watch("agree");
            valid = !!garageName && !!location && !!agree;
            if (!valid) {
                await trigger(["garageName", "location", "agree"], {
                    shouldFocus: true,
                });
            }
        }

        if (valid) {
            setActiveIndex(itemIndex);
        }
    };

    const onSubmit = async (data) => {
        const isStep3Valid = await trigger(["garageName", "location", "agree"]);
        if (isStep3Valid) {
            console.log(data);
            // Post data to backend here!
        } else {
            console.log("Step 3 validation failed");
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
            <StepNavigation
                activeIndex={activeIndex}
                handleStepClick={handleStepClick}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <AnimatePresence mode="wait">
                    {/* Step 1: Email + Password */}
                    {activeIndex === 0 && (
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
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                showConfirmPassword={showConfirmPassword}
                                setShowConfirmPassword={setShowConfirmPassword}
                                watch={watch}
                                itemVariants={itemVariants}
                            />
                        </motion.div>
                    )}

                    {/* Step 2: Admin Info */}
                    {activeIndex === 1 && (
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
                            />
                        </motion.div>
                    )}

                    {/* Step 3: Garage Info */}
                    {activeIndex === 2 && (
                        <motion.div
                            key="step3"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <GarageInfoStep
                                register={register}
                                control={control}
                                errors={errors}
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

export default RegistrationStepper;
