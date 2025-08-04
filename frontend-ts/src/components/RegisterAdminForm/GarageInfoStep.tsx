import { motion, type Variants } from "framer-motion";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type {
    RegistrationData,
    RegistrationError,
} from "../../interfaces/auth.interface";

type GarageInfoStepProp = {
    register: UseFormRegister<RegistrationData>;
    errors: FieldErrors<RegistrationData>;
    control: Control<RegistrationData, unknown, RegistrationData>;
    itemVariants: Variants;
    backError: RegistrationError | null;
    inputClass: (field: string) => string;
};

const GarageInfoStep = ({
    register,
    control,
    errors,
    itemVariants,
    backError,
    inputClass,
}: GarageInfoStepProp) => {
    return (
        <motion.div variants={itemVariants} className="space-y-4">
            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Garage Name
                </label>
                <input
                    className={inputClass("garageName")}
                    type="text"
                    placeholder="Garage Name"
                    {...register("garageName", {
                        required: "Garage name is required",
                    })}
                />
                {errors.garageName && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.garageName.message}
                    </p>
                )}
                {backError?.field === "garageName" && (
                    <p className="mt-1 text-sm text-red-500">
                        {backError?.message}
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
                    className={inputClass("location")}
                />
                {errors.location && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.location.message}
                    </p>
                )}
                {backError?.field === "location" && (
                    <p className="mt-1 text-sm text-red-500">
                        {backError?.message}
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
                                onChange={e => field.onChange(e.target.checked)}
                            />
                            <label
                                htmlFor="agree"
                                className={`ml-2 block text-sm ${
                                    errors.agree
                                        ? "text-red-500"
                                        : "text-gray-700"
                                }`}>
                                I agree to the terms and conditions
                            </label>
                        </div>
                    )}
                />
            </motion.div>
        </motion.div>
    );
};

export default GarageInfoStep;
