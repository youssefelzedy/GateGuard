import { useState } from "react";
import { useAdmin } from "../auth/useAdmin";
import { useUsers } from "./useUsers";
import { convertArabicToEnglish } from "../../utils/helper";
import Plate from "../../ui/Plate";
import { ArrowDownUp } from "lucide-react";

function UsersTable() {
    const { admin } = useAdmin();
    const { users } = useUsers(admin?.garage.id);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchGeneral, setSearchGeneral] = useState("");
    const [searchPlate, setSearchPlate] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const itemsPerPage = 5;

    const handleSearchGeneral = (e) => {
        setSearchGeneral(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchPlate = (e) => {
        setSearchPlate(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                // Toggle between ascending and descending
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    const filteredUsers = users?.filter((user) => {
        const generalQuery = searchGeneral.trim().toLowerCase();
        const plateQuery = convertArabicToEnglish(
            searchPlate.trim(),
        ).toLowerCase();

        const matchesGeneral =
            user?.name?.toLowerCase().includes(generalQuery) ||
            user?.email?.toLowerCase().includes(generalQuery) ||
            user?.phoneNumber?.includes(generalQuery) ||
            user?.nationalSecurityNumber?.includes(generalQuery);

        const matchesPlate = user?.carPlate?.toLowerCase().includes(plateQuery);

        return matchesGeneral && matchesPlate;
    });

    const sortedUsers = [...(filteredUsers || [])].sort((a, b) => {
        if (!sortConfig.key) return 0; // no sorting yet
        const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const paginatedUsers = sortedUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="mt-6">
            {/* Two Search Bars */}
            <div className="mb-4 flex flex-col items-end gap-2 sm:flex-row sm:justify-end">
                <input
                    type="text"
                    placeholder="Search car plate..."
                    value={searchPlate}
                    onChange={handleSearchPlate}
                    className="grow rounded border border-primary-300 px-3 py-2 text-primary-900 placeholder:text-primary-400 focus:outline-none"
                />
                <input
                    type="text"
                    placeholder="Search users (name, email, phone, ID)..."
                    value={searchGeneral}
                    onChange={handleSearchGeneral}
                    className="rounded border border-primary-300 px-3 py-2 text-primary-900 placeholder:text-primary-400 focus:outline-none"
                />
            </div>

            {/* Table */}
            <table className="w-full table-auto border-collapse text-left">
                <thead>
                    <tr className="bg-primary-100 font-medium text-primary-900">
                        <th className="p-3">
                            Plate Number
                            <button
                                onClick={() => handleSort("carPlate")}
                                className="ml-1"
                            >
                                <ArrowDownUp size={12} />
                            </button>
                        </th>
                        <th className="p-3">
                            User Name
                            <button
                                onClick={() => handleSort("name")}
                                className="ml-1"
                            >
                                <ArrowDownUp size={12} />
                            </button>
                        </th>
                        <th className="p-3">
                            Email
                            <button
                                onClick={() => handleSort("email")}
                                className="ml-1"
                            >
                                <ArrowDownUp size={12} />
                            </button>
                        </th>
                        <th className="p-3">
                            Phone Number
                            <button
                                onClick={() => handleSort("phoneNumber")}
                                className="ml-1"
                            >
                                <ArrowDownUp size={12} />
                            </button>
                        </th>
                        <th className="p-3">
                            National ID
                            <button
                                onClick={() =>
                                    handleSort("nationalSecurityNumber")
                                }
                                className="ml-1"
                            >
                                <ArrowDownUp size={12} />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers?.map((user, index) => (
                        <tr
                            key={index}
                            className="border-b border-primary-200 transition hover:bg-primary-50"
                        >
                            <td className="p-3 text-primary-900">
                                <Plate carPlate={user.carPlate} />
                            </td>
                            <td className="p-3 text-primary-900">
                                {user.name}
                            </td>
                            <td className="p-3 text-primary-900">
                                {user.email}
                            </td>
                            <td className="p-3 text-primary-900">
                                {user.phoneNumber}
                            </td>
                            <td className="p-3 text-primary-900">
                                {user.nationalSecurityNumber}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="rounded bg-primary-700 px-4 py-2 text-white disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="rounded bg-primary-700 px-4 py-2 text-white disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default UsersTable;
