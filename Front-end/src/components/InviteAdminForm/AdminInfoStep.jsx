import { motion } from "framer-motion";
import ImageUpload from "./ImageUpload";

function AdminInfoStep({
    register,
    errors,
    shouldShowError,
    imagePreview,
    setImagePreview,
    inputClass,
    itemVariants,
}) {
    return (
        <motion.div variants={itemVariants} className="space-y-4">
            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    type="text"
                    {...register("fullName", {
                        required: "Full name is required",
                    })}
                    className={`${inputClass} ${
                        shouldShowError(errors.fullName)
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                            : ""
                    }`}
                    placeholder="Enter your full name"
                />
                {shouldShowError(errors.fullName) && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.fullName.message}
                    </p>
                )}
            </motion.div>

            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^[0-9+\-\s()]*$/,
                            message: "Invalid phone number format",
                        },
                    })}
                    className={`${inputClass} ${
                        shouldShowError(errors.phone)
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                            : ""
                    }`}
                    placeholder="Enter your phone number"
                />
                {shouldShowError(errors.phone) && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.phone.message}
                    </p>
                )}
            </motion.div>

            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    National ID
                </label>
                <input
                    type="text"
                    {...register("nationalId", {
                        required: "National ID is required",
                    })}
                    className={`${inputClass} ${
                        shouldShowError(errors.nationalId)
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                            : ""
                    }`}
                    placeholder="Enter your national ID"
                />
                {shouldShowError(errors.nationalId) && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.nationalId.message}
                    </p>
                )}
            </motion.div>

            <ImageUpload
                register={register}
                errors={errors}
                shouldShowError={shouldShowError}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                inputClass={inputClass}
                itemVariants={itemVariants}
            />
        </motion.div>
    );
}

export default AdminInfoStep;
