import { useState, useRef, useEffect, useMemo } from "react";
import { useAdmin } from "../auth/useAdmin";
import { useUsers } from "./useUsers";
import { useDeleteUser } from "./useDeleteUser";
import { convertArabicToEnglish } from "../../utils/helper";
import UsersTableHeader from "./UsersTableHeader";
import UserTableRow from "./UserTableRow";
import EditUserForm from "./EditUserForm";
import DeleteModal from "../../components/Tables/DeleteModal";
import TablePagination from "../../components/Tables/TablePagination";
import type { User } from "../../interfaces/user.interface";

function UsersTable() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?._id;
    const { users } = useUsers(garageId!);
    const { deleteUser, isPending } = useDeleteUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchGeneral, setSearchGeneral] = useState("");
    const [searchPlate, setSearchPlate] = useState("");
    const [sortConfig, setSortConfig] = useState<{
        key: keyof User | null;
        direction: "asc" | "desc";
    }>({
        key: null,
        direction: "asc",
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | undefined>(undefined);
    const [deleteUserData, setDeleteUserData] = useState<User | null>(null);
    const modalRef = useRef(null);

    const itemsPerPage = 5;

    const handleSearchGeneral = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchGeneral(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchPlate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchPlate(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key: keyof User) => {
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

    // Focus trap for edit modal
    useEffect(() => {
        if (!isEditModalOpen) return;
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") handleCloseModal();
        }
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isEditModalOpen]);

    // Memoized filtered, sorted, and paginated users
    const filteredUsers = useMemo(() => {
        return users?.filter(user => {
            const generalQuery = searchGeneral.trim().toLowerCase();
            const plateQuery = convertArabicToEnglish(
                searchPlate.trim()
            ).toLowerCase();
            const matchesGeneral =
                user?.name?.toLowerCase().includes(generalQuery) ||
                user?.email?.toLowerCase().includes(generalQuery) ||
                user?.phoneNumber?.includes(generalQuery) ||
                user?.nationalSecurityNumber?.includes(generalQuery);
            const matchesPlate = user?.carPlate
                ?.toLowerCase()
                .includes(plateQuery);
            return matchesGeneral && matchesPlate;
        });
    }, [users, searchGeneral, searchPlate]);

    const sortedUsers = useMemo(() => {
        return [...(filteredUsers || [])].sort((a, b) => {
            if (!sortConfig.key) return 0;
            const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
            const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredUsers, sortConfig]);

    const paginatedUsers = useMemo(() => {
        return sortedUsers.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [sortedUsers, currentPage, itemsPerPage]);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handleEditClick = (user: User) => {
        setEditUser(user);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setEditUser(undefined);
    };

    const handleDeleteClick = (user: User) => {
        setDeleteUserData(user);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeleteUserData(null);
    };

    const handleConfirmDelete = () => {
        if (deleteUserData) {
            deleteUser(deleteUserData._id, {
                onSuccess: () => {
                    handleCloseDeleteModal();
                    setDeleteUserData(null);
                },
            });
        }
    };

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

    return (
        <>
            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-2xl animate-fadeSlideUp overflow-hidden rounded-lg bg-primary-50 p-8 shadow-lg transition-all duration-500 dark:bg-gray-900"
                        role="dialog"
                        aria-modal="true">
                        <button
                            onClick={handleCloseModal}
                            className="absolute right-4 top-4 text-2xl text-primary-700 hover:text-primary-900"
                            aria-label="Close edit modal">
                            &times;
                        </button>
                        <EditUserForm
                            user={editUser!}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                item={deleteUserData!}
                isDeleting={isPending}
                type="user"
            />

            <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                {/* Two Search Bars */}
                <div className="mt-4 flex flex-col items-end gap-2 sm:flex-row sm:justify-end">
                    <input
                        type="text"
                        placeholder="Search users (name, email, phone, ID)..."
                        value={searchGeneral}
                        onChange={handleSearchGeneral}
                        className="grow rounded border border-primary-300 px-3 py-2 text-primary-900 placeholder:text-primary-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-primary-100 dark:placeholder:text-primary-200"
                    />
                    <input
                        type="text"
                        placeholder="Search car plate..."
                        value={searchPlate}
                        onChange={handleSearchPlate}
                        className="rounded border border-primary-300 px-3 py-2 text-primary-900 placeholder:text-primary-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-primary-100 dark:placeholder:text-primary-200"
                    />
                </div>

                {/* Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-left">
                        <UsersTableHeader
                            onSort={handleSort}
                            sortConfig={sortConfig}
                        />
                        <tbody>
                            {paginatedUsers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-6 text-center text-gray-400 dark:text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedUsers.map(user => (
                                    <UserTableRow
                                        key={user.nationalSecurityNumber}
                                        user={user}
                                        onEdit={handleEditClick}
                                        onDelete={handleDeleteClick}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
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

export default UsersTable;
