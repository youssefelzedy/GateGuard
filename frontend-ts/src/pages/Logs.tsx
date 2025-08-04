import LogsTable from "../features/logsPage/LogsTable";

function Logs() {
    return (
        <div className="flex h-full flex-col bg-primary-50 p-6 transition-colors duration-300 dark:bg-gray-900">
            <LogsTable />
        </div>
    );
}

export default Logs;
