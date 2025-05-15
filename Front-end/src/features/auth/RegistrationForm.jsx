// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Import components
import OwnerSteps from "../../components/RegisterAdminForm/OwnerSteps";
import AccountStep from "../../components/RegisterAdminForm/AccountStep";
import AdminInfoStep from "../../components/RegisterAdminForm/AdminInfoStep";
import GarageInfoStep from "../../components/RegisterAdminForm/GarageInfoStep";
import FormButtons from "../../components/RegisterAdminForm/FormButtons";
import { useSignup } from "./useSignup";

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
    } = useForm({
        mode: "onSubmit",
        shouldFocusError: true,
    });

    const inputClass =
        "w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

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

    const onSubmit = async (data) => {
        const isStep3Valid =
            (await trigger(["garageName", "location", "agree"])) &&
            data.agree &&
            data.garageName &&
            data.location;

        if (isStep3Valid) {
            const finalData = {
                email: data.email,
                password: data.password,
                passwordConfirm: data.passwordConfirm,
                name: data.name,
                phoneNumber: data.phoneNumber,
                nationalSecurityNumber: data.nationalSecurityNumber,
                garageName: data.garageName,
                location: data.location,
            };
            console.log(finalData);
            signup(finalData);
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
                            exit="exit"
                        >
                            <AccountStep
                                register={register}
                                errors={errors}
                                watch={watch}
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
        </motion.div>
    );
}

export default RegistrationStepper;
