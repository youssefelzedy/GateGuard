import { useAdmin } from "../../features/auth/useAdmin";
import { useUsers } from "../../features/users/useUsers";
import Plate from "../../ui/Plate";

function RecentEntries() {
    const { admin } = useAdmin();
    const { users } = useUsers(admin?.garage.id);

    const recentUsers = [...(users || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    return (
        <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
                Most recent entries
            </h2>
            <table className="w-full table-auto text-sm">
                <thead>
                    <tr className="text-left text-slate-500">
                        <th className="pb-3">No</th>
                        <th className="pb-3">Car Information</th>
                        <th className="pb-3">Access Date</th>
                        <th className="pb-3">Access Status</th>
                        <th className="pb-3">Owner</th>
                    </tr>
                </thead>
                <tbody>
                    {recentUsers.map((user, index) => (
                        <tr
                            key={index}
                            className="border-t border-slate-200 transition hover:bg-slate-50"
                        >
                            <td className="py-4 font-bold text-blue-700">{`0${index + 1}`}</td>

                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <Plate
                                            carPlate={user?.carPlate || "-"}
                                            className="scale-90"
                                        />
                                        <div className="mt-1 text-xs text-slate-400">
                                            Garage: {user?.garage?.name || "1"}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td className="py-4">
                                <div className="font-semibold text-slate-800">
                                    {new Date(
                                        user?.createdAt,
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                                <div className="mt-0.5 text-xs text-sky-600">
                                    {new Date(
                                        user?.createdAt,
                                    ).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                            </td>

                            <td className="py-4">
                                <span
                                    className={`rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-sm ${
                                        user?.status === "Accepted"
                                            ? "bg-green-500"
                                            : user?.status === "Denied"
                                              ? "bg-red-500"
                                              : "bg-blue-600"
                                    }`}
                                >
                                    {user?.status || "Manual"}
                                </span>
                            </td>

                            <td className="py-4">
                                <div className="font-semibold text-slate-800">
                                    {user?.name || "Unknown"}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RecentEntries;
