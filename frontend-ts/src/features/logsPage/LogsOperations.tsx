type LogsOperationsProps = {
    searchQuery: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterValue: string;
    onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectedDate: string;
    onDateChange: (date: string) => void;
};

function LogsOperations({
    searchQuery,
    onSearchChange,
    filterValue,
    onFilterChange,
    selectedDate,
    onDateChange,
}: LogsOperationsProps) {
    return (
        <div className="mb-4 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
                type="text"
                placeholder="Search logs (plate, user name)..."
                value={searchQuery}
                onChange={onSearchChange}
                className="grow rounded-lg border border-gray-300 px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:ring-blue-400"
            />
            <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-600 dark:text-gray-300">
                    Status:
                </span>
                <select
                    value={filterValue}
                    onChange={onFilterChange}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
                    <option value="all">All</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Denied">Denied</option>
                </select>
                <label
                    htmlFor="date-filter"
                    className="ml-4 text-gray-700 dark:text-gray-300">
                    Date:
                </label>
                <input
                    id="date-filter"
                    type="date"
                    value={selectedDate === "all" ? "" : selectedDate}
                    onChange={e => onDateChange(e.target.value)}
                    className="rounded-lg border bg-white px-4 py-2 text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                />
                <button
                    onClick={() => onDateChange("all")}
                    className={`ml-2 rounded px-4 py-2 transition-colors ${selectedDate === "all" ? "bg-blue-500 text-white dark:bg-blue-600" : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}`}>
                    All
                </button>
            </div>
        </div>
    );
}

export default LogsOperations;
