import { useState } from "react";
import { useInviteAdmin } from "./useInviteAdmin";

function AdminsHeader() {
    const [email, setEmail] = useState("");
    const { inviteAdmin } = useInviteAdmin();
    const handleSubmit = (e) => {
        e.preventDefault();
        inviteAdmin(
            { email },
            {
                onSettled: () => {
                    setEmail("");
                },
            },
        );
    };
    return (
        <div className="flex items-center justify-between rounded">
            <h1 className="text-4xl font-bold text-primary-900">Admins</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="rounded border border-primary-300 px-3 py-2 text-primary-900 placeholder:text-primary-400 focus:outline-none"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Add Admin by Email"
                />
                <button
                    type="submit"
                    className="ml-2 rounded bg-primary-500 px-3 py-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default AdminsHeader;
