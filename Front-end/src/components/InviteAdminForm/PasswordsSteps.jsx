import { Eye, EyeOff } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

function PasswordsSteps({ register, errors, inputClass, itemVariants }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <motion.div variants={itemVariants} className="space-y-4">
            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
                            },
                        })}
                        className={`${inputClass} ${
                            errors.password
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                : ""
                        }`}
                        placeholder="Create a password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-all duration-300 hover:text-slate-700"
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}
            </motion.div>

            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("passwordConfirm", {
                            required: "Please confirm your password",
                            validate: (value, formValues) =>
                                value === formValues.password ||
                                "Passwords do not match",
                        })}
                        className={`${inputClass} ${
                            errors.passwordConfirm
                                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                                : ""
                        }`}
                        placeholder="Confirm your password"
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-all duration-300 hover:text-slate-700"
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
                {errors.passwordConfirm && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.passwordConfirm.message}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
}

export default PasswordsSteps;
