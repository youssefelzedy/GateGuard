import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

function RegistrationForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Here you would send `data` to your backend
    };

    const inputClass =
        "w-full rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

    return (
        <div className="relative w-full max-w-md animate-fadeSlideUp overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-500">
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-slate-800">
                    Welcome to Gate Guard
                </h1>
            </div>

            <div className="-z-1 absolute -left-5 -top-2 animate-float opacity-25">
                <img
                    src="/Shield.svg"
                    alt="Logo"
                    className="h-auto w-auto transition-opacity duration-700"
                />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* User Name */}
                <input
                    type="text"
                    placeholder="User Name"
                    {...register("username", {
                        required: "User name is required",
                    })}
                    className={inputClass}
                    disabled={isSubmitting}
                />
                {errors.username && (
                    <p className="pl-2 text-sm text-red-500">
                        {errors.username.message}
                    </p>
                )}

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                    className={inputClass}
                    disabled={isSubmitting}
                />
                {errors.email && (
                    <p className="pl-2 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}

                {/* Garage Name */}
                <input
                    type="text"
                    placeholder="Garage Name"
                    {...register("garageName", {
                        required: "Garage name is required",
                    })}
                    className={inputClass}
                    disabled={isSubmitting}
                />
                {errors.garageName && (
                    <p className="pl-2 text-sm text-red-500">
                        {errors.garageName.message}
                    </p>
                )}

                {/* Password */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        className={inputClass}
                        disabled={isSubmitting}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        disabled={isSubmitting}
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="pl-2 text-sm text-red-500">
                        {errors.password.message}
                    </p>
                )}

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: "Confirm your password",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords do not match",
                        })}
                        className={inputClass}
                        disabled={isSubmitting}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        disabled={isSubmitting}
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="pl-2 text-sm text-red-500">
                        {errors.confirmPassword.message}
                    </p>
                )}

                {/* Garage Image */}
                <Controller
                    name="image"
                    control={control}
                    rules={{ required: "Image is required" }}
                    render={({ field }) => (
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        field.onChange(e.target.files);
                                        setImagePreview(
                                            URL.createObjectURL(file),
                                        ); // 👈 Create preview URL
                                    }
                                }}
                                className="block w-full text-sm text-slate-600"
                                disabled={isSubmitting}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 h-32 w-32 rounded-md object-cover shadow-md"
                                />
                            )}
                        </>
                    )}
                />
                {errors.image && (
                    <p className="text-sm text-red-500">
                        {errors.image.message}
                    </p>
                )}

                {/* Agree to Terms */}
                <div
                    className={`flex items-center text-sm ${errors.agree ? "text-red-500" : "text-slate-600"}`}
                >
                    <Controller
                        name="agree"
                        control={control}
                        rules={{ required: "You must agree to continue" }}
                        render={({ field }) => (
                            <div className="flex items-center text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    {...field}
                                    checked={field.value || false}
                                    className="mr-2"
                                    disabled={isSubmitting}
                                />
                                By proceeding, you agree to the{" "}
                                <a
                                    href="#"
                                    className="ml-1 text-blue-600 underline"
                                >
                                    Terms and Conditions
                                </a>
                            </div>
                        )}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full rounded-md bg-[#0F2543] px-4 py-3 font-medium text-white transition-all hover:bg-[#0c1e36] ${
                        isSubmitting ? "animate-pulse" : ""
                    }`}
                >
                    {isSubmitting ? "Processing..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;
