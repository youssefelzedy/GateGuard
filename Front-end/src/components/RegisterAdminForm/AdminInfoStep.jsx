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
                    type="text"
                    {...register("name", {
                        required: "Full name is required",
                    })}
                    className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter your full name"
                />
                {errors.name && (
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
                    {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                            value: /^(010|011|012|015)[0-9]{8}$/,
                            message:
                                "Invalid phone number format (11 digits with 010/011/012/015)",
                        },
                    })}
                    className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    placeholder="Enter your phone number"
                />
                {errors.phone && (
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
                    {...register("nationalSecurityNumber", {
                        required: "National ID is required",
                    })}
                    className={`${inputClass} ${
                        errors.nationalId
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                            : ""
                    }`}
                    placeholder="Enter your national ID"
                />
                {errors.nationalSecurityNumber && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.nationalId.message}
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
