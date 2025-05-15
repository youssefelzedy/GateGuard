// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ImageUpload from "./ImageUpload";

const AdminInfoStep = ({
    register,
    errors,
    itemVariants,
    inputClass,
    backError,
}) => {
    return (
        <motion.div variants={itemVariants} className="space-y-4">
            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    className={inputClass("name")}
                    placeholder="Enter your full name"
                    type="text"
                    {...register("name", {
                        required: "Full name is required",
                    })}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </motion.div>

            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    className={inputClass("phoneNumber")}
                    placeholder="Enter your phone number"
                    type="tel"
                    {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^(010|011|012|015)[0-9]{8}$/,
                            message:
                                "Invalid phone number format (11 digits with 010/011/012/015)",
                        },
                    })}
                />
                {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.phoneNumber.message}
                    </p>
                )}
            </motion.div>

            <motion.div variants={itemVariants}>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    National Security Number
                </label>
                <input
                    className={inputClass("nationalSecurityNumber")}
                    placeholder="Enter your national ID"
                    type="text"
                    {...register("nationalSecurityNumber", {
                        required: "National Number is required",
                        pattern: {
                            value: /^[23][0-9]{13}$/,
                            message: "National ID must start with 2 or 3 and be 14 digits",
                        },
                    })}
                />
                {errors.nationalSecurityNumber && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.nationalSecurityNumber.message}
                    </p>
                )}
                {backError?.field === "nationalSecurityNumber" && (
                    <p className="mt-1 text-sm text-red-500">
                        {backError?.message}
                    </p>
                )}
            </motion.div>

            {/* <ImageUpload
                register={register}
                errors={errors}
                itemVariants={itemVariants}
            /> */}
        </motion.div>
    );
};

export default AdminInfoStep;
