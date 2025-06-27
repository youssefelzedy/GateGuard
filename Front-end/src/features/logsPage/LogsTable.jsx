import { useState, useMemo } from "react";
import { Calendar, Clock } from "lucide-react";
import Plate from "../../ui/Plate";
import { useLogs } from "./useLogs";
import { useAdmin } from "../auth/useAdmin";
import LogsTableHeader from "./LogsTableHeader";
import LogsOperations from "./LogsOperations";
import TablePagination from "../../components/Tables/TablePagination";

function LogsTable() {
    const { admin } = useAdmin();
    const garageId = admin?.garage?.id;
    const { logs } = useLogs(garageId);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterValue, setFilterValue] = useState("all");
    const [sortConfig, setSortConfig] = useState({
        key: "accessTime",
        direction: "desc",
    });

    // Add state for date filter
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
    });

    const itemsPerPage = 6;

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleFilter = (e) => {
        setFilterValue(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const filteredLogs = useMemo(() => {
        if (!logs) return [];
        return logs.filter((log) => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                log.plateText.toLowerCase().includes(searchLower) ||
                log.user?.name?.toLowerCase().includes(searchLower);

            const matchesFilter =
                filterValue === "all" || log.action === filterValue;

            // Date filtering
            let matchesDate = true;
            if (selectedDate && selectedDate !== "all") {
                const logDate = new Date(log.accessTime)
                    .toISOString()
                    .split("T")[0];
                matchesDate = logDate === selectedDate;
            }

            return matchesSearch && matchesFilter && matchesDate;
        });
    }, [logs, searchQuery, filterValue, selectedDate]);

    const sortedLogs = useMemo(() => {
        return [...filteredLogs].sort((a, b) => {
            if (!sortConfig.key) return 0;

            const keys = sortConfig.key.split(".");
            let aValue = a;
            let bValue = b;
            for (let key of keys) {
                aValue = aValue ? aValue[key] : undefined;
                bValue = bValue ? bValue[key] : undefined;
            }

            aValue = aValue?.toString().toLowerCase() || "";
            bValue = bValue?.toString().toLowerCase() || "";

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredLogs, sortConfig]);

    const paginatedLogs = useMemo(() => {
        return sortedLogs.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage,
        );
    }, [sortedLogs, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);

    const handlePrevPage = () =>
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-900">
            <h2 className="mb-6 text-4xl font-bold text-gray-800 dark:text-white">
                Access Logs
            </h2>
            <LogsOperations
                searchQuery={searchQuery}
                onSearchChange={handleSearch}
                filterValue={filterValue}
                onFilterChange={handleFilter}
                selectedDate={selectedDate}
                onDateChange={(date) => {
                    setSelectedDate(date);
                    setCurrentPage(1);
                }}
            />
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <LogsTableHeader
                        onSort={handleSort}
                        sortConfig={sortConfig}
                    />
                    <tbody>
                        {paginatedLogs.length > 0 ? (
                            paginatedLogs.map((log) => (
                                <tr
                                    key={log._id}
                                    className="border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                                >
                                    <td className="p-4 align-middle">
                                        <Plate carPlate={log.plateText} />
                                    </td>
                                    <td className="p-4 align-middle">
                                        {log.user && log.user.name ? (
                                            <div>
                                                <div className="font-semibold text-gray-800 dark:text-white">
                                                    {log.user.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {log.user.phoneNumber}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="italic text-gray-400 dark:text-gray-500">
                                                No User Found
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 align-middle text-gray-700 dark:text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5 text-gray-400" />
                                            <span>
                                                {new Date(
                                                    log.accessTime,
                                                ).toLocaleDateString("en-GB", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Clock className="h-5 w-5 text-gray-400" />
                                            <span>
                                                {new Date(
                                                    log.accessTime,
                                                ).toLocaleTimeString("en-US", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle">
                                        <span
                                            className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                                                log.action === "Accepted"
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                                            }`}
                                        >
                                            {log.action}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="p-6 text-center text-gray-400 dark:text-gray-500"
                                >
                                    No logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevPage={handlePrevPage}
                    onNextPage={handleNextPage}
                />
            )}
        </div>
    );
}

export default LogsTable;
