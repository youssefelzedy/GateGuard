import { useForm } from "react-hook-form";
import { useEditAdmin } from "./useEditAdmin";

function EditAdminForm({ admin, onClose }) {
    const { editAdmin, isPending } = useEditAdmin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: admin.name,
            phoneNumber: admin.phoneNumber,
            nationalSecurityNumber: admin.nationalSecurityNumber,
        },
    });

    const onSubmit = (data) => {
        editAdmin(
            { adminId: admin._id, data },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    const inputClass = (fieldName) =>
        `w-full rounded-md border ${
            errors[fieldName]
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-500 focus:ring-primary-500"
        } px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2`;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Full Name
                </label>
                <input
                    className={inputClass("name")}
                    placeholder="Enter full name"
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
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    className={inputClass("phoneNumber")}
                    placeholder="Enter phone number"
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
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    National Security Number
                </label>
                <input
                    className={inputClass("nationalSecurityNumber")}
                    placeholder="Enter national ID"
                    type="text"
                    {...register("nationalSecurityNumber", {
                        required: "National Number is required",
                        pattern: {
                            value: /^[23][0-9]{13}$/,
                            message:
                                "National ID must start with 2 or 3 and be 14 digits",
                        },
                    })}
                />
                {errors.nationalSecurityNumber && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.nationalSecurityNumber.message}
                    </p>
                )}
            </div>

            <div className="mt-6 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
                    disabled={isPending}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-primary-600 px-4 py-2 text-white transition hover:bg-primary-700 disabled:opacity-50"
                    disabled={isPending}
                >
                    {isPending ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}

export default EditAdminForm;
