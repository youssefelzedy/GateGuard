import { useState } from "react";
import Plate from "../../ui/Plate";

const intialState = {
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    numbers: ["", "", "", ""],
    letters: ["", "", ""],
    confirmed: false,
    agreed: false,
};

function CarForm() {
    const [formData, setFormData] = useState(intialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e, index, type) => {
        const value = e.target.value;
        const updated = [...formData[type]];
        updated[index] = value;
        setFormData({ ...formData, [type]: updated });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => setIsSubmitting(false), 1500);
    };

    const arabicNums = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    const arabicLetters = [
        "أ",
        "ب",
        "ج",
        "د",
        "ر",
        "س",
        "ص",
        "ط",
        "ع",
        "ف",
        "ق",
        "ل",
        "م",
        "ن",
        "هـ",
        "و",
        "ي",
    ];

    return (
        <div className="relative w-full max-w-2xl animate-fadeSlideUp overflow-hidden rounded-lg bg-white p-8 shadow-lg transition-all duration-500">
            <div className="mb-6 text-center">
                <h1 className="inline-block animate-fadeSlideUp bg-gradient-to-r from-blue-800 to-blue-500 bg-clip-text text-2xl font-bold text-slate-800">
                    Submit your car data
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="mb-2 font-semibold text-slate-700">
                    Personal Information
                </h2>
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            placeholder="Full Name"
                            type="text"
                            className="w-full transform rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <input
                            placeholder="Phone Number"
                            type="text"
                            className="w-full transform rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <input
                        placeholder="Email"
                        type="email"
                        className="w-full transform rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                    <input
                        placeholder="National/Corporate ID"
                        className="w-full transform rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <h2 className="mb-2 font-semibold text-slate-700">
                        Car Information
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {formData.numbers.map((val, i) => (
                            <select
                                key={i}
                                value={val}
                                onChange={(e) => handleChange(e, i, "numbers")}
                                className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                            >
                                <option value="">-</option>
                                {arabicNums.map((num, idx) => (
                                    <option key={idx} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        ))}
                        <div class="h-12 w-px bg-gray-300"></div>
                        {formData.letters.map((val, i) => (
                            <select
                                key={i}
                                value={val}
                                onChange={(e) => handleChange(e, i, "letters")}
                                className="rounded-md border border-slate-200 bg-slate-100 px-4 py-3 outline-none"
                            >
                                <option value="">-</option>
                                {arabicLetters.map((ltr, idx) => (
                                    <option key={idx} value={ltr}>
                                        {ltr}
                                    </option>
                                ))}
                            </select>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex flex-col items-center">
                    <Plate
                        numbers={formData.numbers}
                        letters={formData.letters}
                    />
                    <p className="mt-1 text-xs text-slate-500">
                        This is how your plate should look like
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                            type="checkbox"
                            checked={formData.confirmed}
                            onChange={() =>
                                setFormData({
                                    ...formData,
                                    confirmed: !formData.confirmed,
                                })
                            }
                        />
                        I am sure that I provided accurate personal and car
                        data.
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                            type="checkbox"
                            checked={formData.agreed}
                            onChange={() =>
                                setFormData({
                                    ...formData,
                                    agreed: !formData.agreed,
                                })
                            }
                        />
                        By proceeding, you agree to the{" "}
                        <a href="#" className="text-blue-600 hover:underline">
                            Terms and Conditions
                        </a>
                        .
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={
                        isSubmitting || !formData.confirmed || !formData.agreed
                    }
                    className={`w-full rounded-md bg-[#0F2543] px-4 py-3 font-medium text-white transition-all duration-300 hover:bg-[#0c1e36] focus:ring-4 focus:ring-blue-200 ${
                        isSubmitting ? "animate-pulse" : ""
                    }`}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default CarForm;
