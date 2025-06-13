import { useState, useRef, useEffect } from "react";
import { useAdmins } from "./useAdmins";
import { useAdmin } from "../auth/useAdmin";
import { useDeleteAdmin } from "./useDeleteAdmin";
import EditAdminForm from "./EditAdminForm";
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
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editAdminData, setEditAdminData] = useState(null);
    const [deleteAdminData, setDeleteAdminData] = useState(null);
    const modalRef = useRef(null);

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

    const handleEditClick = (admin) => {
        setEditAdminData(admin);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditAdminData(null);
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
            deleteAdmin(deleteAdminData._id);
            handleCloseDeleteModal();
        }
    };

    // Focus trap for edit modal
    useEffect(() => {
        if (!isEditModalOpen) return;

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
                handleCloseEditModal();
            }
        }

        document.addEventListener("keydown", handleTab);
        document.addEventListener("keydown", handleEscape);
        firstElement?.focus();

        return () => {
            document.removeEventListener("keydown", handleTab);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isEditModalOpen]);

    return (
        <>
            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-2xl animate-fadeSlideUp overflow-hidden rounded-lg bg-primary-50 p-8 shadow-lg transition-all duration-500"
                        role="dialog"
                        aria-modal="true"
                    >
                        <button
                            onClick={handleCloseEditModal}
                            className="absolute right-4 top-4 text-2xl text-primary-700 hover:text-primary-900"
                            aria-label="Close edit modal"
                        >
                            &times;
                        </button>
                        <EditAdminForm
                            admin={editAdminData}
                            onClose={handleCloseEditModal}
                        />
                    </div>
                </div>
            )}

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
                        className="grow rounded border border-primary-300 px-3 py-2 text-primary-900 placeholder:text-primary-400 focus:outline-none"
                    />
                </div>

                <table className="w-full table-auto border-collapse text-left shadow-md">
                    <AdminsTableHeader onSort={handleSort} />
                    <tbody>
                        {paginatedAdmins?.map((admin, index) => (
                            <AdminTableRow
                                key={index}
                                admin={admin}
                                onEdit={handleEditClick}
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
