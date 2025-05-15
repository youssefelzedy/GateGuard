import { useState } from "react";
import {
    ArrowDownUp,
    SquareArrowLeft,
    SquareArrowRight,
    Pencil,
    Trash2,
} from "lucide-react";
import { useAdmins } from "./useAdmins";
import { useAdmin } from "../auth/useAdmin";

function AdminsTable() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?.id;
    const { admins } = useAdmins(garageId);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchGeneral, setSearchGeneral] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const itemsPerPage = 5;

    const handleSearch = (e) => {
        setSearchGeneral(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    const filteredAdmins = admins?.filter((admin) => {
        const query = searchGeneral.trim().toLowerCase();
        return (
            admin?.name?.toLowerCase().includes(query) ||
            admin?.email?.toLowerCase().includes(query) ||
            admin?.phoneNumber?.includes(query) ||
            admin?.nationalId?.includes(query)
        );
    });

    const sortedAdmins = [...(filteredAdmins || [])].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";
        return sortConfig.direction === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
    });

    const totalPages = Math.ceil(sortedAdmins.length / itemsPerPage);
    const paginatedAdmins = sortedAdmins.slice(
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
            <div className="mb-4 flex justify-end">
                <input
                    type="text"
                    placeholder="Search admins (name, email, phone, ID)..."
                    value={searchGeneral}
                    onChange={handleSearch}
                    className="grow rounded border border-primary-300 px-3 py-2 text-primary-900 placeholder:text-primary-400 focus:outline-none"
                />
            </div>

            <table className="w-full table-auto border-collapse text-left shadow-md">
                <thead>
                    <tr className="bg-primary-100 font-medium text-primary-900">
                        <th className="p-5">
                            Admin Name
                            <button
                                onClick={() => handleSort("name")}
                                className="ml-1"
                            >
                                <ArrowDownUp size={12} />
                            </button>
                        </th>
                        <th className="p-5">
                            Email
                            <button
                                onClick={() => handleSort("email")}
                                className="ml-1"
                            >
                                <ArrowDownUp size={12} />
                            </button>
                        </th>
                        <th className="p-5">
                            Phone Number
                            <button
                                onClick={() => handleSort("phoneNumber")}
                                className="ml-1"
                            >
                                <ArrowDownUp size={12} />
                            </button>
                        </th>
                        <th className="p-5">
                            National ID
                            <button
                                onClick={() => handleSort("nationalId")}
                                className="ml-1"
                            >
                                <ArrowDownUp size={12} />
                            </button>
                        </th>
                        <th className="p-5">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedAdmins?.map((admin, index) => (
                        <tr
                            key={index}
                            className="border-b border-primary-200 hover:bg-primary-50"
                        >
                            <td className="flex items-center gap-4 p-8">
                                <img
                                    src={admin.image}
                                    alt={admin.name}
                                    className="h-12 w-12 rounded-full object-cover"
                                />
                                <span className="capitalize">{admin.name}</span>
                            </td>
                            <td className="p-8">{admin.email}</td>
                            <td className="p-8">{admin.phoneNumber}</td>
                            <td className="p-8">
                                {admin.nationalSecurityNumber}
                            </td>
                            <td className="p-8">
                                <div className="flex gap-4">
                                    <button
                                        className="rounded-full bg-primary-100 p-4 text-primary-700 transition hover:bg-primary-200"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        className="rounded-full bg-red-100 p-4 text-red-600 transition hover:bg-red-200"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="rounded bg-primary-700 p-2 text-white disabled:opacity-50"
                    >
                        <SquareArrowLeft />
                    </button>
                    <span className="font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="rounded bg-primary-700 p-2 text-white disabled:opacity-50"
                    >
                        <SquareArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminsTable;
