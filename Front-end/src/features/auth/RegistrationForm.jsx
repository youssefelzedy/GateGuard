import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Steps } from "primereact/steps";
import { AtSign, Eye, EyeOff, User, Warehouse } from "lucide-react";

function RegistrationStepper() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        control,
        trigger,
        formState: { errors, isSubmitting },
    } = useForm();

    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem
            ? "var(--primary-color)"
            : "var(--surface-b)";
        const textColor = isActiveItem
            ? "var(--surface-b)"
            : "var(--text-color-secondary)";

        const handleStepClick = async () => {
            let valid = false;

            // Validate the current step before navigating
            if (activeIndex === 0) {
                valid = await trigger(["email", "password", "confirmPassword"]);
            } else if (activeIndex === 1) {
                valid = await trigger(["fullName", "phone", "nationalId"]);
            } else {
                valid = true; // No validation for step 3 when navigating
            }

            if (valid) {
                setActiveIndex(itemIndex);
            }
        };

        return (
            <div
                className="flex cursor-pointer flex-col items-center"
                onClick={handleStepClick} // Handle step navigation
            >
                <span
                    className="align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 inline-flex cursor-pointer"
                    style={{
                        backgroundColor: backgroundColor,
                        color: textColor,
                        marginTop: "-25px",
                    }}
                >
                    {item.icon}
                </span>
                <small className="mt-2 text-sm text-primary-800">
                    {item.label}
                </small>
            </div>
        );
    };

    const steps = [
        {
            icon: (
                <AtSign
                    size={48}
                    className={`m-2 rounded-2xl ${activeIndex === 0 ? "bg-primary-800 stroke-primary-50" : "bg-primary-50 stroke-primary-800/50"} p-2`}
                />
            ),
            label: "Account",
            template: (item) => itemRenderer(item, 0),
        },
        {
            icon: (
                <User
                    size={48}
                    className={`m-2 rounded-2xl ${activeIndex === 1 ? "bg-primary-800 stroke-primary-50" : "bg-primary-50 stroke-primary-800/50"} p-2`}
                />
            ),
            label: "Admin Info",
            template: (item) => itemRenderer(item, 1),
        },
        {
            icon: (
                <Warehouse
                    size={48}
                    className={`m-2 rounded-2xl ${activeIndex === 2 ? "bg-primary-800 stroke-primary-50" : "bg-primary-50 stroke-primary-800/50"} p-2`}
                />
            ),
            label: "Garage Info",
            template: (item) => itemRenderer(item, 2),
        },
    ];

    const inputClass =
        "w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

    const onSubmit = async (data) => {
        const isStep3Valid = await trigger([
            "garageName",
            "location",
            "garageImage",
            "agree",
        ]);
        if (isStep3Valid) {
            console.log(data);
            // Post data to backend here!
        } else {
            console.log("Step 3 validation failed");
        }
    };

    return (
        <div className="card mx-auto w-full max-w-xl rounded-md bg-white p-6 shadow-lg">
            <div className="relative mb-6 py-8">
                <div className="absolute left-1/2 top-8 z-0 h-1 w-[70%] -translate-x-1/2 rounded-full bg-gray-300" />
                <div
                    className={`absolute top-8 z-10 h-1 translate-x-1/2 rounded-full bg-primary-700 transition-all duration-300 ${
                        activeIndex === 0
                            ? "hidden"
                            : activeIndex === 1
                              ? "left-0 w-[35%]"
                              : "left-1/3 w-[35%]"
                    }`}
                />

                <Steps
                    model={steps}
                    activeIndex={activeIndex}
                    readOnly={false}
                    className="relative z-20 bg-transparent"
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Step 1: Email + Password */}
                {activeIndex === 0 && (
                    <>
                        <input
                            className={inputClass}
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="ml-2 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                                className={inputClass}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="ml-2 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}

                        <div className="relative">
                            <input
                                className={inputClass}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    required: "Confirm your password",
                                    validate: (value) =>
                                        value === watch("password") ||
                                        "Passwords do not match",
                                })}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="ml-2 text-sm text-red-500">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </>
                )}

                {/* Step 2: Admin Info */}
                {activeIndex === 1 && (
                    <div className="flex items-center gap-10">
                        <div className="space-y-4">
                            <input
                                className={inputClass}
                                type="text"
                                placeholder="Full Name"
                                {...register("fullName", {
                                    required: "Full Name is required",
                                })}
                            />
                            {errors.fullName && (
                                <p className="ml-2 text-sm text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}

                            <input
                                className={inputClass}
                                type="text"
                                placeholder="Phone Number"
                                {...register("phone", {
                                    required: "Phone is required",
                                    pattern: {
                                        value: /^(010|011|012|015)[0-9]{8}$/,
                                        message:
                                            "Invalid phone number format (11 digits with 010/011/012/015)",
                                    },
                                })}
                            />
                            {errors.phone && (
                                <p className="ml-2 text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}

                            <input
                                className={inputClass}
                                type="text"
                                placeholder="National ID"
                                {...register("nationalId", {
                                    required: "National ID is required",
                                    pattern: {
                                        value: /^[2-3][0-9]{13}$/,
                                        message:
                                            "Invalid National ID format (14 digits)",
                                    },
                                })}
                            />
                            {errors.nationalId && (
                                <p className="ml-2 text-sm text-red-500">
                                    {errors.nationalId.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Upload Your Image
                            </label>
                            <div
                                className="relative mt-2 h-40 w-40 cursor-pointer rounded-full border border-gray-300 object-cover shadow-md"
                                onClick={() =>
                                    document.getElementById("image").click()
                                }
                            >
                                <img
                                    src={
                                        imagePreview ||
                                        "/path/to/default-image.jpg"
                                    } // Default image if no preview
                                    alt="Garage Preview"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                {...register("image", {
                                    required: "Garage image is required",
                                })}
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImagePreview(
                                            URL.createObjectURL(file),
                                        );
                                    }
                                }}
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500">
                                    {errors.image.message}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 3: Garage Info */}
                {activeIndex === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Garage Name"
                            {...register("garageName", {
                                required: "Garage name is required",
                            })}
                            className={inputClass}
                        />
                        {errors.garageName && (
                            <p className="ml-2 text-sm text-red-500">
                                {errors.garageName.message}
                            </p>
                        )}

                        <input
                            type="text"
                            placeholder="Garage Location"
                            {...register("location", {
                                required: "Garage location is required",
                            })}
                            className={inputClass}
                        />
                        {errors.location && (
                            <p className="ml-2 text-sm text-red-500">
                                {errors.location.message}
                            </p>
                        )}

                        {/* Agree to Terms */}
                        <Controller
                            name="agree"
                            control={control}
                            rules={{ required: "You must agree to continue" }}
                            render={({ field }) => (
                                <div className="flex items-center text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        {...field}
                                        checked={field.value || false}
                                        className="mr-2"
                                    />
                                    By proceeding, you agree to the
                                    <a
                                        href="#"
                                        className="ml-1 text-blue-600 underline"
                                    >
                                        Terms and Conditions
                                    </a>
                                </div>
                            )}
                        />
                        {errors.agree && (
                            <p className="text-sm text-red-500">
                                {errors.agree.message}
                            </p>
                        )}
                    </>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col items-center justify-between gap-3">
                    {activeIndex === steps.length - 1 && (
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default RegistrationStepper;
