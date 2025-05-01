import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const AccountStep = ({
    register,
    errors,
    shouldShowError,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    watch,
    itemVariants,
}) => {
    return (
        <motion.div variants={itemVariants} className="space-y-4">
            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                {shouldShowError(errors.email) && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </motion.div>

            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Password
                </label>
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
                        className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                {shouldShowError(errors.password) && (
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
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                        className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                {shouldShowError(errors.confirmPassword) && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
};

export default AccountStep;
