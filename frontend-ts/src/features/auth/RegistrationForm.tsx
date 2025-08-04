import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

// Import components
import OwnerSteps from "../../components/RegisterAdminForm/OwnerSteps";
import AccountStep from "../../components/RegisterAdminForm/AccountStep";
import AdminInfoStep from "../../components/RegisterAdminForm/AdminInfoStep";
import GarageInfoStep from "../../components/RegisterAdminForm/GarageInfoStep";
import FormButtons from "../../components/RegisterAdminForm/FormButtons";

import { useSignup } from "./useSignup";
import type { RegistrationData } from "../../interfaces/auth.interface";

function RegistrationStepper() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { signup, error: backError } = useSignup();
    const {
        register,
        handleSubmit,
        watch,
        control,
        trigger,
        formState: { errors },
    } = useForm<RegistrationData>({
        mode: "onSubmit",
        shouldFocusError: true,
    });

    const inputClass = (field: string) =>
        `w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
            errors[field as keyof RegistrationData]
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : ""
        }`;

    useEffect(() => {
        if (backError) {
            if (backError?.field === "email") {
                setActiveIndex(0);
            } else if (
                backError?.field === "phoneNumber" ||
                backError?.field === "nationalSecurityNumber"
            ) {
                setActiveIndex(1);
            } else if (
                backError?.field === "garageName" ||
                backError?.field === "location"
            ) {
                setActiveIndex(2);
            }
        }
    }, [backError]);

    const onSubmit = async (data: RegistrationData) => {
        const isStep3Valid =
            (await trigger(["garageName", "location", "agree"])) &&
            data.agree &&
            data.garageName &&
            data.location;

        if (isStep3Valid) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { agree, ...finalData } = data;
            signup(finalData);
        } else {
            console.log("Step 3 validation failed");
        }
    };

    // Animation variants
    const containerVariants: Variants = {
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

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24,
            },
        },
        exit: { y: -20, opacity: 0 },
    };

    const buttonVariants: Variants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95 },
    };

    return (
        <motion.div
            className="card mx-auto w-full max-w-xl rounded-md bg-white p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            <OwnerSteps activeIndex={activeIndex} />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <AnimatePresence mode="wait">
                    {/* Step 1: Email + Password */}
                    {activeIndex === 0 && (
                        <motion.div
                            key="step1"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <AccountStep
                                register={register}
                                errors={errors}
                                watch={watch}
                                inputClass={inputClass}
                                itemVariants={itemVariants}
                                backError={backError}
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
                            exit="exit">
                            <AdminInfoStep
                                register={register}
                                errors={errors}
                                inputClass={inputClass}
                                itemVariants={itemVariants}
                                backError={backError}
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
                            exit="exit">
                            <GarageInfoStep
                                register={register}
                                control={control}
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
                    buttonVariants={buttonVariants}
                    trigger={trigger}
                />
            </form>
            <div
                className="animate-in mt-6 text-center"
                style={{ animationDelay: "500ms" }}>
                <p className="text-sm text-slate-600">
                    Already have an account?
                    <Link
                        to={"/login"}
                        className="group relative ml-1 font-medium text-primary-600 transition-colors duration-200 hover:text-primary-800">
                        Login
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </p>
            </div>
        </motion.div>
    );
}

export default RegistrationStepper;
