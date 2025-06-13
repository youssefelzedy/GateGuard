import { Pencil, Trash2 } from "lucide-react";
import Plate from "../../ui/Plate";

function UserTableRow({ user, onEdit, onDelete }) {
    return (
        <tr className="border-b border-primary-200 transition hover:bg-primary-50">
            <td className="p-3 text-primary-900">
                <Plate carPlate={user.carPlate} />
            </td>
            <td className="p-3 text-primary-900">{user.name}</td>
            <td className="p-3 text-primary-900">{user.email}</td>
            <td className="p-3 text-primary-900">{user.phoneNumber}</td>
            <td className="p-3 text-primary-900">
                {user.nationalSecurityNumber}
            </td>
            <td className="p-3">
                <div className="flex gap-4">
                    <button
                        className="rounded-full bg-primary-100 p-4 text-primary-700 transition hover:bg-primary-200"
                        title="Edit"
                        aria-label="Edit user"
                        onClick={() => onEdit(user)}
                    >
                        <Pencil size={16} />
                    </button>
                    <button
                        className="rounded-full bg-red-100 p-4 text-red-600 transition hover:bg-red-200"
                        title="Delete"
                        aria-label="Delete user"
                        onClick={() => onDelete(user)}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default UserTableRow;
