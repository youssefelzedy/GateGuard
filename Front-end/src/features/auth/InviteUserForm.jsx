import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import Plate from "../../ui/Plate";
import {
    englishToArabicLetters,
    englishToArabicNumbers,
} from "../../utils/constants";
import { useParams } from "react-router";
import { useAcceptUser } from "./useAcceptUser";

const defaultValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
    nationalId: "",
    numbers: ["", "", "", ""],
    letters: ["", "", ""],
    confirmed: false,
};

function InviteUserForm() {
    const { token } = useParams();
    const { acceptInvitation } = useAcceptUser();
    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    const numbers = watch("numbers");
    const letters = watch("letters");

    const onSubmit = (data) => {
        const hasNumber = numbers.some((n) => n !== "");
        const hasLetter = letters.some((l) => l !== "");
        if (!hasNumber || !hasLetter) {
            toast.error("Please select at least one number and one letter");
            return;
        }
        const finalData = {
            name: data.fullName,
            phoneNumber: data.phoneNumber,
            nationalSecurityNumber: data.nationalId,
            carPlate: [...data.numbers, ...data.letters]
                .filter(Boolean)
                .join("-"),
        };

        acceptInvitation({ data: finalData, token });
        reset();
    };

    return (
        <div className="relative w-full max-w-2xl animate-fadeSlideUp overflow-hidden rounded-lg bg-primary-50 p-8 shadow-lg transition-all duration-500">
            <div className="mb-6 text-center">
                <h1 className="inline-block bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-2xl font-bold capitalize text-primary-800">
                    Submit your data
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="mb-2 font-semibold text-slate-700">
                    Personal Information
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full">
                            <input
                                className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3"
                                placeholder="Full Name"
                                type="text"
                                {...register("fullName", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.fullName && (
                                <p className="mt-1 pl-4 text-sm text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <input
                                className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3"
                                placeholder="Phone Number"
                                type="text"
                                {...register("phoneNumber", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^(010|011|012|015)[0-9]{8}$/,
                                        message: "Invalid phone number format",
                                    },
                                })}
                            />
                            {errors.phoneNumber && (
                                <p className="mt-1 pl-4 text-sm text-red-500">
                                    {errors.phoneNumber.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <input
                            className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3"
                            placeholder="National/Corporate ID"
                            {...register("nationalId", {
                                required: "National ID is required",
                                pattern: {
                                    value: /^[2-3][0-9]{13}$/,
                                    message: "Invalid National ID format",
                                },
                            })}
                        />
                        {errors.nationalId && (
                            <p className="mt-1 pl-4 text-sm text-red-500">
                                {errors.nationalId.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="mb-2 font-semibold text-slate-700">
                        Car Information
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Controller
                                key={`num-${i}`}
                                name={`numbers.${i}`}
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                                    >
                                        <option value="">-</option>
                                        {Array.from(
                                            englishToArabicNumbers.entries(),
                                        ).map(([eng, ar], idx) => (
                                            <option
                                                key={`num-${idx}`}
                                                value={eng}
                                            >
                                                {ar}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        ))}
                        <div className="h-12 w-px bg-gray-400"></div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Controller
                                key={`ltr-${i}`}
                                name={`letters.${i}`}
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                                    >
                                        <option value="">-</option>
                                        {Array.from(
                                            englishToArabicLetters.entries(),
                                        ).map(([eng, ar], idx) => (
                                            <option
                                                key={`letter-${idx}`}
                                                value={eng}
                                            >
                                                {ar}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        ))}
                    </div>
                </div>

                {/* Plate Preview */}
                <div className="mt-4 flex flex-col items-center">
                    <Plate
                        carPlate={[...numbers, ...letters]
                            .filter(Boolean)
                            .join("-")}
                    />
                    <p className="mt-1 text-xs text-slate-500">
                        This is how your plate should look like
                    </p>
                </div>

                {/* Confirmations */}
                <div className="space-y">
                    <label
                        className={`flex items-center gap-2 text-sm text-slate-700 ${
                            errors.confirmed
                                ? "text-red-500 underline underline-offset-2"
                                : ""
                        }`}
                    >
                        <input
                            type="checkbox"
                            {...register("confirmed", { required: true })}
                        />
                        I confirm the accuracy of the provided personal and car
                        data.
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full rounded-md bg-primary-700 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-primary-500 focus:ring-4 focus:ring-blue-200 ${
                        isSubmitting ? "animate-pulse" : ""
                    }`}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default InviteUserForm;
