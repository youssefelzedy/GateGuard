import { Pencil, Trash2 } from "lucide-react";
import Plate from "../../ui/Plate";
import { useAdmin } from "../auth/useAdmin";

function UserTableRow({ user, onEdit, onDelete }) {
    const { isOwner } = useAdmin();

    return (
        <tr className="border-b border-primary-200 hover:bg-primary-100 hover:shadow-md dark:border-gray-900 dark:bg-gray-900 dark:hover:bg-gray-700">
            <td className="p-5 text-primary-900 dark:text-primary-100">
                <Plate carPlate={user.carPlate} />
            </td>
            <td className="p-5 text-primary-900 dark:text-primary-100">
                {user.name}
            </td>
            <td className="p-5 text-primary-900 dark:text-primary-100">
                {user.email}
            </td>
            <td className="p-5 text-primary-900 dark:text-primary-100">
                {user.phoneNumber}
            </td>
            <td className="p-5 text-primary-900 dark:text-primary-100">
                {user.nationalSecurityNumber}
            </td>
            {isOwner && (
                <td className="p-5">
                    <div className="flex gap-4">
                        <button
                            className="rounded-full bg-primary-100 p-4 text-primary-700 transition hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-100 dark:hover:bg-primary-700"
                            title="Edit"
                            aria-label="Edit user"
                            onClick={() => onEdit(user)}
                        >
                            <Pencil size={16} />
                        </button>
                        <button
                            className="rounded-full bg-red-100 p-4 text-red-600 transition hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-700"
                            title="Delete"
                            aria-label="Delete user"
                            onClick={() => onDelete(user)}
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </td>
            )}
        </tr>
    );
}

export default UserTableRow;
