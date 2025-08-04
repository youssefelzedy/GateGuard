import { ArrowDownUp } from "lucide-react";
import { useAdmin } from "../auth/useAdmin";
import type { User } from "../../interfaces/user.interface";

type UsersTableHeaderProps = {
    onSort: (key: keyof User) => void;
    sortConfig: {
        key: keyof User | null;
        direction: "asc" | "desc";
    };
};

function UsersTableHeader({ onSort, sortConfig }: UsersTableHeaderProps) {
    const { isOwner } = useAdmin();
    return (
        <thead>
            <tr className="bg-primary-100 font-medium text-primary-900 dark:bg-gray-800 dark:text-primary-100">
                <th className="px-3 py-5" scope="col">
                    Plate Number
                    <button
                        onClick={() => onSort("carPlate")}
                        className="ml-1"
                        aria-label="Sort by plate number">
                        <ArrowDownUp
                            size={12}
                            className={
                                sortConfig.key === "carPlate"
                                    ? sortConfig.direction === "asc"
                                        ? "rotate-180"
                                        : ""
                                    : "opacity-50"
                            }
                        />
                    </button>
                </th>
                <th className="px-3 py-5" scope="col">
                    User Name
                    <button
                        onClick={() => onSort("name")}
                        className="ml-1"
                        aria-label="Sort by user name">
                        <ArrowDownUp
                            size={12}
                            className={
                                sortConfig.key === "name"
                                    ? sortConfig.direction === "asc"
                                        ? "rotate-180"
                                        : ""
                                    : "opacity-50"
                            }
                        />
                    </button>
                </th>
                <th className="px-3 py-5" scope="col">
                    Email
                    <button
                        onClick={() => onSort("email")}
                        className="ml-1"
                        aria-label="Sort by email">
                        <ArrowDownUp
                            size={12}
                            className={
                                sortConfig.key === "email"
                                    ? sortConfig.direction === "asc"
                                        ? "rotate-180"
                                        : ""
                                    : "opacity-50"
                            }
                        />
                    </button>
                </th>
                <th className="px-3 py-5" scope="col">
                    Phone Number
                    <button
                        onClick={() => onSort("phoneNumber")}
                        className="ml-1"
                        aria-label="Sort by phone number">
                        <ArrowDownUp
                            size={12}
                            className={
                                sortConfig.key === "phoneNumber"
                                    ? sortConfig.direction === "asc"
                                        ? "rotate-180"
                                        : ""
                                    : "opacity-50"
                            }
                        />
                    </button>
                </th>
                <th className="px-3 py-5" scope="col">
                    National ID
                    <button
                        onClick={() => onSort("nationalSecurityNumber")}
                        className="ml-1"
                        aria-label="Sort by national ID">
                        <ArrowDownUp
                            size={12}
                            className={
                                sortConfig.key === "nationalSecurityNumber"
                                    ? sortConfig.direction === "asc"
                                        ? "rotate-180"
                                        : ""
                                    : "opacity-50"
                            }
                        />
                    </button>
                </th>
                {isOwner && (
                    <th className="px-3 py-5" scope="col">
                        Actions
                    </th>
                )}
            </tr>
        </thead>
    );
}

export default UsersTableHeader;
