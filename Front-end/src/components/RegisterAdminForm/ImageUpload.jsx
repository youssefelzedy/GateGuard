// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

const ImageUpload = ({ register, errors, itemVariants }) => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Update the preview state
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <motion.div variants={itemVariants}>
            <label className="mb-1 block text-sm font-medium text-gray-700">
                Profile Image
            </label>
            <div className="flex items-center space-x-4">
                <div
                    className={`relative h-24 w-24 overflow-hidden rounded-full border-2 ${
                        errors.image ? "border-red-500" : "border-primary-200"
                    }`}
                >
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Profile Preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                            No Image
                        </div>
                    )}
                </div>
                <div className="flex flex-1 items-center gap-4">
                    <input
                        type="file"
                        accept="image/*"
                        id="image"
                        className="hidden"
                        {...register("image", {
                            required: "Profile image is required",
                            onChange: (e) => handleImageChange(e), // Ensure the preview is updated
                        })}
                    />
                    <label
                        htmlFor="image"
                        className="inline-block cursor-pointer rounded-md bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800"
                    >
                        Choose Image
                    </label>
                    {errors.image && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.image.message}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ImageUpload;
