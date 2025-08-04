import { ArrowUp, ArrowDown } from "lucide-react";
import type { Log } from "../../interfaces/logs.interface";

type LogsTableHeaderProps = {
    onSort: (key: keyof Log) => void;
    sortConfig: {
        key: keyof Log;
        direction: "asc" | "desc";
    };
};

function LogsTableHeader({ onSort, sortConfig }: LogsTableHeaderProps) {
    const renderSortArrow = (key: keyof Log) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
        ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
        );
    };

    const headers = [
        { key: "plateText", label: "Plate Number" },
        { key: "user.name", label: "User Name" },
        { key: "accessTime", label: "Date" },
        { key: "action", label: "State" },
    ];

    return (
        <thead>
            <tr className="border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                {headers.map(({ key, label }) => (
                    <th
                        key={key}
                        className="cursor-pointer p-4 text-sm font-bold uppercase text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                        onClick={() => onSort(key as keyof Log)}>
                        <div className="flex items-center">
                            {label} {renderSortArrow(key as keyof Log)}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default LogsTableHeader;
