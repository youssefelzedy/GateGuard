import { motion } from "framer-motion";
import { Controller } from "react-hook-form";

const GarageInfoStep = ({
    register,
    control,
    errors,
    shouldShowError,
    itemVariants,
}) => {
    return (
        <motion.div variants={itemVariants} className="space-y-4">
            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Garage Name
                </label>
                <input
                    type="text"
                    placeholder="Garage Name"
                    {...register("garageName", {
                        required: "Garage name is required",
                    })}
                    className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {shouldShowError(errors.garageName) && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.garageName.message}
                    </p>
                )}
            </motion.div>

            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Garage Location
                </label>
                <input
                    type="text"
                    placeholder="Garage Location"
                    {...register("location", {
                        required: "Garage location is required",
                    })}
                    className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                {shouldShowError(errors.location) && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.location.message}
                    </p>
                )}
            </motion.div>

            {/* Agree to Terms */}
            <motion.div variants={itemVariants}>
                <Controller
                    name="agree"
                    control={control}
                    rules={{ required: "You must agree to continue" }}
                    render={({ field }) => (
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id="agree"
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                checked={field.value}
                                onChange={(e) =>
                                    field.onChange(e.target.checked)
                                }
                            />
                            <label
                                htmlFor="agree"
                                className="ml-2 block text-sm text-gray-700"
                            >
                                I agree to the terms and conditions
                            </label>
                        </div>
                    )}
                />
                {shouldShowError(errors.agree) && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.agree.message}
                    </p>
                )}
            </motion.div>
        </motion.div>
    );
};

export default GarageInfoStep;
