//eslint-disable-next-line
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useAdmin } from "../features/auth/useAdmin";
import { useUpdateAdmin } from "../features/auth/useUpdateAdmin";
import { User, Mail, Phone, IdCard, Camera } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
        },
    },
};

function Profile() {
    const { admin } = useAdmin();
    const { updateAdmin, isPending } = useUpdateAdmin();
    const [isEditing, setIsEditing] = useState(false);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: admin?.name || "",
        email: admin?.email || "",
        phoneNumber: admin?.phoneNumber || "",
        nationalSecurityNumber: admin?.nationalSecurityNumber || "",
        image: admin?.image || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAdmin(formData, {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageClick = (e) => {
        e.preventDefault();
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.div
            className="min-h-screen bg-primary-50 p-6 transition-colors duration-300 dark:bg-gray-900"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="mx-auto max-w-6xl">
                <motion.div variants={itemVariants}>
                    <h1 className="mb-8 text-3xl font-bold text-primary-900 dark:text-primary-100">
                        Profile Settings
                    </h1>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
                >
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                            Personal Information
                        </h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            {isEditing ? "Cancel" : "Edit"}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-8">
                        {/* Left side - Image */}
                        <div className="w-1/3">
                            <div className="relative">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={handleImageClick}
                                    className="w-full"
                                    disabled={!isEditing}
                                >
                                    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-primary-100 dark:bg-gray-900">
                                        <img
                                            src={
                                                formData.image || "default.jpg"
                                            }
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                        />
                                        {isEditing && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-primary-900/50 opacity-0 transition-opacity hover:opacity-100">
                                                <div className="flex flex-col items-center gap-2 text-white">
                                                    <Camera className="h-8 w-8" />

                                                    <span className="text-sm font-medium">
                                                        Change Photo
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            </div>
                            {isEditing && (
                                <div className="mt-4">
                                    <label
                                        htmlFor="image"
                                        className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-200"
                                    >
                                        Profile Image URL
                                    </label>
                                    <input
                                        type="text"
                                        id="image"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border border-primary-200 px-3 py-2 text-primary-900 placeholder-primary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100 dark:placeholder-primary-400"
                                        placeholder="Enter image URL"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Right side - Form */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-200"
                                >
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User className="h-5 w-5 text-primary-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="block w-full rounded-md border border-primary-200 py-2 pl-10 pr-3 text-primary-900 placeholder-primary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-primary-50 disabled:text-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100 dark:placeholder-primary-400 dark:disabled:bg-gray-800 dark:disabled:text-primary-500"
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-200"
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="h-5 w-5 text-primary-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="block w-full rounded-md border border-primary-200 py-2 pl-10 pr-3 text-primary-900 placeholder-primary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-primary-50 disabled:text-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100 dark:placeholder-primary-400 dark:disabled:bg-gray-800 dark:disabled:text-primary-500"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="phoneNumber"
                                    className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-200"
                                >
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Phone className="h-5 w-5 text-primary-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="block w-full rounded-md border border-primary-200 py-2 pl-10 pr-3 text-primary-900 placeholder-primary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-primary-50 disabled:text-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100 dark:placeholder-primary-400 dark:disabled:bg-gray-800 dark:disabled:text-primary-500"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="nationalSecurityNumber"
                                    className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-200"
                                >
                                    National Security Number
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <IdCard className="h-5 w-5 text-primary-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="nationalSecurityNumber"
                                        name="nationalSecurityNumber"
                                        value={formData.nationalSecurityNumber}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="block w-full rounded-md border border-primary-200 py-2 pl-10 pr-3 text-primary-900 placeholder-primary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-primary-50 disabled:text-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100 dark:placeholder-primary-400 dark:disabled:bg-gray-800 dark:disabled:text-primary-500"
                                        placeholder="Enter your national security number"
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-primary-400"
                                    >
                                        {isPending
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Profile;
