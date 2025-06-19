import { Pencil, Trash2 } from "lucide-react";

function AdminTableRow({ admin, onEdit, onDelete }) {
    return (
        <tr className="border-b border-primary-200 hover:bg-primary-50 dark:border-gray-900 dark:bg-gray-900 dark:hover:bg-gray-700">
            <td className="flex items-center gap-4 p-5">
                <img
                    src={admin.image}
                    alt={admin.name}
                    className="h-12 w-12 rounded-full object-cover"
                />
                <span className="capitalize text-primary-900 dark:text-primary-100">
                    {admin.name}
                </span>
            </td>
            <td className="p-5 text-primary-900 dark:text-primary-100">
                {admin.email}
            </td>
            <td className="p-5 text-primary-900 dark:text-primary-100">
                {admin.phoneNumber}
            </td>
            <td className="p-5 text-primary-900 dark:text-primary-100">
                {admin.nationalSecurityNumber}
            </td>
            <td className="p-5">
                <div className="flex gap-4">
                    <button
                        className="rounded-full bg-primary-100 p-4 text-primary-700 transition hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-100 dark:hover:bg-primary-700"
                        title="Edit"
                        onClick={() => onEdit(admin)}
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        className="rounded-full bg-red-100 p-4 text-red-600 transition hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-700"
                        title="Delete"
                        onClick={() => onDelete(admin)}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default AdminTableRow;
