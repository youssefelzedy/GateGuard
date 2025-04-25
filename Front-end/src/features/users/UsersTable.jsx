import Plate from "../../ui/Plate";
import { useAdmin } from "../auth/useAdmin";
import { useUsers } from "./useUsers";

function UsersTable() {
    const { admin } = useAdmin();
    const { users } = useUsers(admin?.garage.id);

    return (
        <div className="mt-6">
            <table className="w-full table-auto border-collapse text-left">
                <thead>
                    <tr className="bg-primary-100 font-medium text-primary-900">
                        <th className="p-3">Plate Number</th>
                        <th className="p-3">User Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone Number</th>
                        <th className="p-3">National ID</th>
                    </tr>
                </thead>
                {}
                <tbody>
                    {users?.map((user, index) => (
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
        </div>
    );
}

export default UsersTable;
