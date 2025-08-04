import { useState, type ChangeEvent } from "react";
import { useAdmins } from "./useAdmins";
import { useAdmin } from "../auth/useAdmin";
import { useDeleteAdmin } from "./useDeleteAdmin";
import AdminsTableHeader from "./AdminsTableHeader";
import AdminTableRow from "./AdminTableRow";
import TablePagination from "../../components/Tables/TablePagination";
import DeleteModal from "../../components/Tables/DeleteModal";
import type { Admin } from "../../interfaces/admin.interface";

type SortType = { key: keyof Admin | null; direction: "asc" | "desc" };

function AdminsTable() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?._id;
    const { admins } = useAdmins(garageId!);
    const { deleteAdmin, isPending: isDeleting } = useDeleteAdmin();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchGeneral, setSearchGeneral] = useState("");
    const [sortConfig, setSortConfig] = useState<SortType>({
        key: null,
        direction: "asc",
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteAdminData, setDeleteAdminData] = useState<Admin | null>(null);
    const itemsPerPage = 5;

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchGeneral(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key: keyof Admin) => {
        setSortConfig(prev => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    const filteredAdmins = admins?.filter(admin => {
        const query = searchGeneral.trim().toLowerCase();
        return (
            admin?.name?.toLowerCase().includes(query) ||
            admin?.email?.toLowerCase().includes(query) ||
            admin?.phoneNumber?.includes(query) ||
            admin?.nationalSecurityNumber?.includes(query)
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
        currentPage * itemsPerPage
    );

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handleDeleteClick = (admin: Admin) => {
        setDeleteAdminData(admin);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteAdminData(null);
    };

    const handleConfirmDelete = () => {
        if (deleteAdminData) {
            deleteAdmin(deleteAdminData._id, {
                onSuccess: () => {
                    handleCloseDeleteModal();
                },
            });
        }
    };

    return (
        <>
            {/* Delete Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                item={deleteAdminData!}
                isDeleting={isDeleting}
                type="admin"
            />

            <div className="mt-6 rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                <div className="mb-4 flex justify-end">
                    <input
                        type="text"
                        placeholder="Search admins (name, email, phone, ID)..."
                        value={searchGeneral}
                        onChange={handleSearch}
                        className="grow rounded border border-primary-300 px-3 py-2 text-primary-900 placeholder:text-primary-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100 dark:placeholder:text-primary-200"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <AdminsTableHeader onSort={handleSort} />
                        <tbody>
                            {paginatedAdmins.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-6 text-center text-gray-400 dark:text-gray-500">
                                        No admins found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedAdmins.map((admin, index) => (
                                    <AdminTableRow
                                        key={index}
                                        admin={admin}
                                        onDelete={handleDeleteClick}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                />
            </div>
        </>
    );
}

export default AdminsTable;
