import { useRef, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    item,
    isDeleting,
    type = "item",
}) {
    const modalRef = useRef(null);

    // Focus trap for modal
    useEffect(() => {
        if (!isOpen) return;

        const modal = modalRef.current;
        const focusableElements = modal?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const firstElement = focusableElements?.[0];
        const lastElement = focusableElements?.[focusableElements.length - 1];

        function handleTab(e) {
            if (e.key !== "Tab") return;
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }

        function handleEscape(e) {
            if (e.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleTab);
        document.addEventListener("keydown", handleEscape);
        firstElement?.focus();

        return () => {
            document.removeEventListener("keydown", handleTab);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div
                ref={modalRef}
                className="relative w-full max-w-md animate-fadeSlideUp overflow-hidden rounded-lg bg-primary-50 p-8 shadow-lg transition-all duration-500 dark:bg-gray-800"
                role="dialog"
                aria-modal="true"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-2xl text-primary-700 hover:text-primary-900 dark:text-primary-100 dark:hover:text-primary-300"
                    aria-label="Close delete modal"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="text-center">
                    <h2 className="mb-4 text-xl font-semibold text-primary-900 dark:text-primary-100">
                        Confirm Deletion
                    </h2>
                    <p className="mb-6 text-primary-700 dark:text-primary-200">
                        Are you sure you want to delete {type}{" "}
                        <span className="font-semibold dark:text-primary-100">
                            {item?.name}
                        </span>
                        ? This action cannot be undone.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={onClose}
                            className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-primary-100 dark:hover:bg-gray-600"
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 disabled:opacity-50 dark:bg-red-700 dark:hover:bg-red-800"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
