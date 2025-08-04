import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { useEditUser } from "./useEditUser";
import {
    englishToArabicNumbers,
    englishToArabicLetters,
} from "../../utils/constants";
import Plate from "../../ui/Plate";
import type {
    User,
    UserInvitationFormData,
} from "../../interfaces/user.interface";

const processLicensePlate = (carPlate: string) => {
    let numbers = ["", "", "", ""];
    let letters = ["", "", ""];

    if (carPlate) {
        const plateParts = carPlate.split("-");
        const foundNumbers = plateParts.filter(part =>
            englishToArabicNumbers.has(part)
        );
        const foundLetters = plateParts.filter(part =>
            englishToArabicLetters.has(part)
        );
        numbers = [...foundNumbers, "", "", "", ""].slice(0, 4);
        letters = [...foundLetters, "", "", ""].slice(0, 3);
    }

    return { numbers, letters };
};

function EditUserForm({ user, onClose }: { user: User; onClose: () => void }) {
    const { editUser, isPending } = useEditUser();

    const { numbers, letters } = useMemo(
        () => processLicensePlate(user?.carPlate),
        [user?.carPlate]
    );

    const defaultValues: UserInvitationFormData = useMemo(
        () => ({
            userId: user._id,
            data: {
                name: user?.name || "",
                phoneNumber: user?.phoneNumber || "",
                nationalSecurityNumber: user?.nationalSecurityNumber || "",
                numbers,
                letters,
            },
        }),
        [user, numbers, letters]
    );

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<UserInvitationFormData>({
        defaultValues,
    });

    const watchedNumbers = watch("data.numbers", numbers);
    const watchedLetters = watch("data.letters", letters);

    const onSubmit = (data: UserInvitationFormData) => {
        const hasNumber = watchedNumbers.some(n => n !== "");
        const hasLetter = watchedLetters.some(l => l !== "");

        if (!hasNumber || !hasLetter) {
            toast.error("Please select at least one number and one letter");
            return;
        }

        const finalData = {
            name: data.data.name,
            phoneNumber: data.data.phoneNumber,
            nationalSecurityNumber: data.data.nationalSecurityNumber,
            carPlate: [...data.data.numbers, ...data.data.letters]
                .filter(Boolean)
                .join("-"),
        };
        editUser(
            {
                userId: user._id,
                data: finalData,
            },
            {
                onSuccess: () => {
                    if (onClose) onClose();
                },
            }
        );
    };

    useEffect(() => {
        reset(defaultValues);
    }, [user, defaultValues, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="mb-2 font-semibold text-slate-700 dark:text-primary-100">
                Edit User Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="w-full">
                        <input
                            className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-primary-100"
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
                            className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-primary-100"
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
                        className="w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 dark:border-gray-700 dark:bg-gray-800 dark:text-primary-100"
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
                            {errors.data.nationalSecurityNumber.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <h2 className="mb-2 font-semibold text-slate-700 dark:text-primary-100">
                    Car Information
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
                                    className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-primary-100">
                                    <option value="">-</option>
                                    {Array.from(
                                        englishToArabicNumbers.entries()
                                    ).map(([eng, ar], idx) => (
                                        <option key={`num-${idx}`} value={eng}>
                                            {ar}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    ))}
                    <div className="h-12 w-px bg-gray-400 dark:bg-gray-700"></div>
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Controller
                            key={`ltr-${i}`}
                            name={`data.letters.${i}`}
                            control={control}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-primary-100">
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

            <div className="mt-4 flex flex-col items-center">
                <Plate
                    carPlate={[...watchedNumbers, ...watchedLetters]
                        .filter(Boolean)
                        .join("-")}
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-primary-200">
                    This is how the plate will look like
                </p>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className={`w-full rounded-md bg-primary-700 px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-primary-500 focus:ring-4 focus:ring-blue-200 dark:bg-primary-800 dark:text-primary-100 dark:hover:bg-primary-600 dark:focus:ring-primary-900 ${
                    isPending ? "animate-pulse" : ""
                }`}>
                {isPending ? "Saving..." : "Save Changes"}
            </button>

            <div className="mt-2 flex gap-4">
                <button
                    type="button"
                    className="flex-1 rounded-md border border-primary-300 bg-white px-4 py-3 font-medium text-primary-700 transition hover:bg-primary-100 dark:border-gray-700 dark:bg-gray-800 dark:text-primary-100 dark:hover:bg-primary-700"
                    disabled={isPending}
                    onClick={() => {
                        reset(defaultValues);
                    }}>
                    Reset
                </button>
                <button
                    type="button"
                    className="flex-1 rounded-md border border-red-300 bg-white px-4 py-3 font-medium text-red-700 transition hover:bg-red-100 dark:border-gray-700 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-700"
                    disabled={isPending}
                    onClick={onClose}>
                    Close
                </button>
            </div>
        </form>
    );
}

export default EditUserForm;
