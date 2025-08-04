import { useState, type FormEvent } from "react";

type ModelProp = {
    open: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
    loading: boolean;
};

function InviteAdminModal({ open, onClose, onSubmit, loading }: ModelProp) {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(email);
        setEmail("");
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <form
                onSubmit={handleSubmit}
                className="flex h-12 w-full max-w-[400px] items-center justify-between gap-2">
                <div className="w-96 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-bold dark:text-primary-100">
                        Add New Admin
                    </h2>
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-medium dark:text-primary-100">
                            Admin E-mail
                        </label>
                        <input
                            className="w-full rounded border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Add Admin by Email"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-primary-100 dark:hover:bg-gray-600"
                            type="button"
                            onClick={() => {
                                setEmail("");
                                onClose();
                            }}
                            disabled={loading}>
                            Cancel
                        </button>
                        <button
                            className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600"
                            type="submit"
                            disabled={loading}>
                            {loading ? "Sending..." : "Send Invite"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default InviteAdminModal;
