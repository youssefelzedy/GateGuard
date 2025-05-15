import { useState } from "react";
import { useInviteUser } from "./useInviteUser";

function UsersHeader() {
    const [email, setEmail] = useState("");
    const [inviteUserForm, setInviteUserForm] = useState(false);
    const { inviteUser } = useInviteUser();
    const handleSubmit = (e) => {
        e.preventDefault();
        inviteUser(
            { email },
            {
                onSettled: () => {
                    setEmail("");
                    setInviteUserForm(false);
                },
            },
        );
    };
    return (
        <div className="flex items-center justify-between rounded">
            <h1 className="text-4xl font-bold text-primary-900">Users</h1>
            <button
                className="group flex h-full w-[201px] cursor-pointer items-center justify-center gap-2 rounded-full bg-primary-600 px-3 py-2 transition-all duration-300 hover:bg-primary-400"
                onClick={() => setInviteUserForm(true)}
            >
                <span className="font-sans text-[17px] leading-[22px] tracking-wider text-white">
                    Invite User
                </span>
            </button>

            {inviteUserForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <form
                        onSubmit={handleSubmit}
                        className="flex h-12 w-full max-w-[400px] items-center justify-between gap-2"
                    >
                        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-xl font-bold">
                                Add New User
                            </h2>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium">
                                    User E-mail
                                </label>
                                <input
                                    className="w-full rounded border border-gray-300 p-2"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Add User by Email"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                                    onClick={() => {
                                        setInviteUserForm(false);
                                        setEmail("");
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="rounded bg-primary-600 px-4 py-2 text-white hover:bg-primary-500"
                                    type="submit"
                                >
                                    Send Invite
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default UsersHeader;
