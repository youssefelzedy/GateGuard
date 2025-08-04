import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router";
import Plate from "../../ui/Plate";
import {
    englishToArabicLetters,
    englishToArabicNumbers,
} from "../../utils/constants";
import { useAcceptUser } from "./useAcceptUser";
import type {
    UserInvitationData,
    UserInvitationFormData,
} from "../../interfaces/user.interface";

function InviteUserForm() {
    const { token } = useParams();
    const { acceptInvitation } = useAcceptUser();
    const defaultValues = {
        token,
        data: {
            name: "",
            phoneNumber: "",
            nationalSecurityNumber: "",
            numbers: ["", "", "", ""],
            letters: ["", "", ""],
            confirmed: false,
        },
    };

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserInvitationFormData>({
        defaultValues,
    });

    const numbers = watch("data.numbers");
    const letters = watch("data.letters");

    const onSubmit = (data: UserInvitationFormData) => {
        const hasNumber = data.data.numbers.some(n => n !== "");
        const hasLetter = data.data.letters.some(l => l !== "");
        if (!hasNumber || !hasLetter) {
            toast.error("Please select at least one number and one letter");
            return;
        }
        const finalData: UserInvitationData = {
            token: data.token,
            data: {
                name: data.data.name,
                phoneNumber: data.data.phoneNumber,
                nationalSecurityNumber: data.data.nationalSecurityNumber,
                carPlate: [...data.data.numbers, ...data.data.letters]
                    .filter(Boolean)
                    .join("-"),
            },
        };

        acceptInvitation(finalData);
        reset();
    };

    return (
        <div className="relative w-full max-w-2xl animate-fadeSlideUp overflow-hidden rounded-lg bg-primary-50 p-8 shadow-lg transition-all duration-500">
            <div className="mb-6 text-center">
                <h1 className="inline-block bg-gradient-to-r from-primary-800 to-primary-500 bg-clip-text text-2xl font-bold capitalize text-primary-800">
                    Invite User
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h2 className="mb-2 font-semibold text-primary-700">
                    User Information
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="w-full">
                            <input
                                className="w-full rounded-md border border-primary-200 bg-primary-50 px-4 py-3"
                                placeholder="Full Name"
                                type="text"
                                {...register("data.name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.data?.name && (
                                <p className="mt-1 pl-4 text-sm text-red-500">
                                    {errors.data.name.message}
                                </p>
                            )}
                        </div>
                        <div className="w-full">
                            <input
                                className="w-full rounded-md border border-primary-200 bg-primary-50 px-4 py-3"
                                placeholder="Phone Number"
                                type="text"
                                {...register("data.phoneNumber", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^(010|011|012|015)[0-9]{8}$/,
                                        message: "Invalid phone number format",
                                    },
                                })}
                            />
                            {errors.data?.phoneNumber && (
                                <p className="mt-1 pl-4 text-sm text-red-500">
                                    {errors.data.phoneNumber.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <input
                            className="w-full rounded-md border border-primary-200 bg-primary-50 px-4 py-3"
                            placeholder="National/Corporate ID"
                            {...register("data.nationalSecurityNumber", {
                                required: "National ID is required",
                                pattern: {
                                    value: /^[2-3][0-9]{13}$/,
                                    message: "Invalid National ID format",
                                },
                            })}
                        />
                        {errors.data?.nationalSecurityNumber && (
                            <p className="mt-1 pl-4 text-sm text-red-500">
                                {errors.data?.nationalSecurityNumber.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="mb-2 font-semibold text-primary-700">
                        Vehicle Information
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Controller
                                key={`num-${i}`}
                                name={`data.numbers.${i}`}
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="rounded-md border border-primary-200 bg-primary-50 px-4 py-3 outline-none">
                                        <option value="">-</option>
                                        {Array.from(
                                            englishToArabicNumbers.entries()
                                        ).map(([eng, ar], idx) => (
                                            <option
                                                key={`num-${idx}`}
                                                value={eng}>
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
                                name={`data.letters.${i}`}
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="rounded-md border border-primary-200 bg-primary-50 px-4 py-3 outline-none">
                                        <option value="">-</option>
                                        {Array.from(
                                            englishToArabicLetters.entries()
                                        ).map(([eng, ar], idx) => (
                                            <option
                                                key={`letter-${idx}`}
                                                value={eng}>
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
                            errors.data?.confirmed
                                ? "text-red-500 underline underline-offset-2"
                                : ""
                        }`}>
                        <input
                            type="checkbox"
                            {...register("data.confirmed", { required: true })}
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
                    }`}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default InviteUserForm;
