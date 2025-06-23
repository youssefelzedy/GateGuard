//eslint-disable-next-line
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAdmin } from "../features/auth/useAdmin";
import { useUpdateGarage } from "../features/garages/useUpdateGarage";
import { MapPinIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline";
import { Navigate } from "react-router";

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

function Settings() {
    const { admin, isOwner } = useAdmin();
    const { updateGarage, isPending } = useUpdateGarage();
    const [garageName, setGarageName] = useState(
        admin?.garage?.garageName || "",
    );
    const [garageLocation, setGarageLocation] = useState(
        admin?.garage?.location || "",
    );

    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateGarage(
            {
                id: admin?.garage?.id,
                garageName,
                garageLocation,
            },
            {
                onSuccess: () => {
                    setIsEditing(false);
                },
            },
        );
    };

    const resetForm = () => {
        setGarageName(admin?.garage?.garageName || "");
        setGarageLocation(admin?.garage?.location || "");
        setIsEditing(!isEditing);
    };

    if (!isOwner) {
        toast.error("You are not authorized to view this page.");
        return <Navigate to="/dashboard" replace={true} />;
    }

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
                        Settings
                    </h1>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800"
                >
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                            Garage Information
                        </h2>
                        <button
                            onClick={() => resetForm()}
                            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            {isEditing ? "Cancel" : "Edit"}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100">
                                Basic Information
                            </h3>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-200"
                                    >
                                        Garage Name
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <BuildingOfficeIcon className="h-5 w-5 text-primary-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={garageName}
                                            onChange={(e) =>
                                                setGarageName(e.target.value)
                                            }
                                            disabled={!isEditing}
                                            className="block w-full rounded-md border border-primary-200 py-2 pl-10 pr-3 text-primary-900 placeholder-primary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-primary-50 disabled:text-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100 dark:placeholder-primary-400 dark:disabled:bg-gray-800 dark:disabled:text-primary-500"
                                            placeholder="Enter garage name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="location"
                                        className="mb-2 block text-sm font-medium text-primary-700 dark:text-primary-200"
                                    >
                                        Location
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MapPinIcon className="h-5 w-5 text-primary-400" />
                                        </div>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={garageLocation}
                                            onChange={(e) =>
                                                setGarageLocation(
                                                    e.target.value,
                                                )
                                            }
                                            disabled={!isEditing}
                                            className="block w-full rounded-md border border-primary-200 py-2 pl-10 pr-3 text-primary-900 placeholder-primary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-primary-50 disabled:text-primary-500 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100 dark:placeholder-primary-400 dark:disabled:bg-gray-800 dark:disabled:text-primary-500"
                                            placeholder="Enter garage location"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-primary-400"
                                >
                                    {isPending ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Settings;
