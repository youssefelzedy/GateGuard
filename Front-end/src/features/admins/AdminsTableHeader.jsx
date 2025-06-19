import { ArrowDownUp } from "lucide-react";

function AdminsTableHeader({ onSort }) {
    return (
        <thead>
            <tr className="bg-primary-100 font-medium text-primary-900 dark:bg-gray-800 dark:text-primary-100">
                <th className="p-5">
                    Admin Name
                    <button onClick={() => onSort("name")} className="ml-1">
                        <ArrowDownUp size={12} />
                    </button>
                </th>
                <th className="p-5">
                    Email
                    <button onClick={() => onSort("email")} className="ml-1">
                        <ArrowDownUp size={12} />
                    </button>
                </th>
                <th className="p-5">
                    Phone Number
                    <button
                        onClick={() => onSort("phoneNumber")}
                        className="ml-1"
                    >
                        <ArrowDownUp size={12} />
                    </button>
                </th>
                <th className="p-5">
                    National ID
                    <button
                        onClick={() => onSort("nationalId")}
                        className="ml-1"
                    >
                        <ArrowDownUp size={12} />
                    </button>
                </th>
                <th className="p-5">Actions</th>
            </tr>
        </thead>
    );
}

export default AdminsTableHeader;
