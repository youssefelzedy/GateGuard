import { useSearchParams } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { format, subDays, isAfter, isSameDay } from "date-fns";
import { useDarkMode } from "../../context/DarkModeContext";
import { useAdmin } from "../../features/auth/useAdmin";
import { useLogs } from "../../features/logsPage/useLogs";

type ChartData = {
    day: string;
    value: number;
};

const dayOptions = [
    { label: "Last 7 days", value: 7 },
    { label: "Last 15 days", value: 15 },
    { label: "Last 30 days", value: 30 },
];

// function CustomTooltip({
//     active,
//     payload,
// }: {
//     active: boolean;
//     payload: any[];
// }) {
//     if (active && payload && payload.length) {
//         return (
//             <div className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg dark:border-slate-700 dark:bg-gray-800 dark:text-slate-100">
//                 {payload[0].value} cars
//             </div>
//         );
//     }
//     return null;
// }

export default function Graph() {
    const { isDarkMode } = useDarkMode();
    const { admin } = useAdmin();
    const garageId = admin?.garage?._id;
    const { logs } = useLogs(garageId!);
    const [searchParams, setSearchParams] = useSearchParams();
    const days = Number(searchParams.get("days")) || 7;

    // Prepare chart data from logs
    let chartData: ChartData[] = [];
    if (logs && Array.isArray(logs)) {
        // Get today and the start date
        const today = new Date();
        const startDate = subDays(today, days - 1);
        // Prepare a map for counts
        const counts: Record<string, number> = {};
        for (let i = 0; i < days; i++) {
            const date = subDays(today, days - 1 - i);
            const label =
                days === 7 ? format(date, "EEE MM/dd") : format(date, "MM/dd");
            counts[label] = 0;
        }
        logs?.forEach(log => {
            if (log.action === "Accepted" && log.accessTime) {
                const logDate = new Date(log.accessTime);
                if (
                    isAfter(logDate, subDays(today, days)) ||
                    isSameDay(logDate, startDate)
                ) {
                    const label =
                        days === 7
                            ? format(logDate, "EEE MM/dd")
                            : format(logDate, "MM/dd");
                    if (counts[label] !== undefined) {
                        counts[label]++;
                    }
                }
            }
        });
        // Build chart data array
        chartData = Object.entries(counts).map(([day, value]) => ({
            day,
            value,
        }));
    }

    const handleDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams({ days: e.target.value });
    };

    return (
        <div className="w-full">
            <div className="w-full rounded-xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-gray-800">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Authorized Entries
                    </h2>
                    <div className="flex items-center gap-2">
                        <select
                            className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-700"
                            value={days}
                            onChange={handleDaysChange}>
                            {dayOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Chart */}
                <div className="rounded-xl bg-blue-50/50 p-5 dark:bg-primary-900/50">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData}>
                            <CartesianGrid
                                strokeDasharray="4 4"
                                vertical={false}
                                stroke={isDarkMode ? "#374151" : "#e5e7eb"}
                            />
                            <XAxis
                                dataKey="day"
                                tick={{
                                    fill: isDarkMode ? "#e5e7eb" : "#334155",
                                    fontSize: 12,
                                    fontWeight: 500,
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickMargin={20}
                            />
                            <YAxis
                                tick={{
                                    fill: isDarkMode ? "#e5e7eb" : "#334155",
                                    fontSize: 12,
                                    fontWeight: 500,
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickMargin={25}
                            />
                            {/* <Tooltip content={<CustomTooltip />} /> */}
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={isDarkMode ? "#e5e7eb" : "#0f172a"}
                                strokeWidth={2.5}
                                dot={{
                                    r: 5,
                                    stroke: "#0f172a",
                                    strokeWidth: 2,
                                    fill: isDarkMode ? "#e5e7eb" : "#fff",
                                }}
                                activeDot={{
                                    r: 6,
                                    fill: "#0f172a",
                                    stroke: "#e5e7eb",
                                    strokeWidth: 2,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
