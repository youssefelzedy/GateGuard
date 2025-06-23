import { useState } from "react";
import { useAdmins } from "./useAdmins";
import { useAdmin } from "../auth/useAdmin";
import { useDeleteAdmin } from "./useDeleteAdmin";
import DeleteModal from "../../components/Tables/DeleteModal";
import AdminsTableHeader from "./AdminsTableHeader";
import AdminTableRow from "./AdminTableRow";
import TablePagination from "../../components/Tables/TablePagination";

function AdminsTable() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?.id;
    const { admins } = useAdmins(garageId);
    const { deleteAdmin, isPending: isDeleting } = useDeleteAdmin();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchGeneral, setSearchGeneral] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteAdminData, setDeleteAdminData] = useState(null);

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

    const handleDeleteClick = (admin) => {
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
                item={deleteAdminData}
                isDeleting={isDeleting}
                type="admin"
            />

            <div className="mt-6">
                <div className="mb-4 flex justify-end">
                    <input
                        type="text"
                        placeholder="Search admins (name, email, phone, ID)..."
                        value={searchGeneral}
                        onChange={handleSearch}
                        className="grow rounded border border-primary-300 px-3 py-2 text-primary-900 placeholder:text-primary-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-primary-100 dark:placeholder:text-primary-200"
                    />
                </div>

                <table className="w-full table-auto border-collapse bg-white text-left shadow-md transition-colors duration-300 dark:bg-gray-800">
                    <AdminsTableHeader onSort={handleSort} />
                    <tbody>
                        {paginatedAdmins?.map((admin, index) => (
                            <AdminTableRow
                                key={index}
                                admin={admin}
                                onDelete={handleDeleteClick}
                            />
                        ))}
                    </tbody>
                </table>

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
