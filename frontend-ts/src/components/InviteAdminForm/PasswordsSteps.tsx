import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import type {
    FieldErrors,
    UseFormRegister,
    UseFormWatch,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import type { AdminInvitationData } from "../../interfaces/admin.interface";

export interface PasswordsStepsProps {
    register: UseFormRegister<AdminInvitationData>;
    watch: UseFormWatch<AdminInvitationData>;
    errors: FieldErrors<AdminInvitationData>;
    inputClass: (field: string) => string;
    itemVariants: Variants;
}

function PasswordsSteps({
    register,
    errors,
    inputClass,
    itemVariants,
}: PasswordsStepsProps) {
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
                        className={inputClass("password")}
                        placeholder="Create a password"
                        type={showPassword ? "text" : "password"}
                        {...register("data.password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message:
                                    "Password must be at least 8 characters",
                            },
                        })}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-all duration-300 hover:text-slate-700">
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
                {errors.data?.password && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.data.password.message}
                    </p>
                )}
            </motion.div>

            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        className={inputClass("passwordConfirm")}
                        placeholder="Confirm your password"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("data.passwordConfirm", {
                            required: "Please confirm your password",
                            validate: (value, formValues) =>
                                value === formValues.data.password ||
                                "Passwords do not match",
                        })}
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-all duration-300 hover:text-slate-700">
                        {showConfirmPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
                {errors.data?.passwordConfirm && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.data.passwordConfirm.message}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
}

export default PasswordsSteps;
