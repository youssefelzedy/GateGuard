import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { useDarkMode } from "../../context/DarkModeContext";

const data = [
    { day: "Sun", value: 20 },
    { day: "Mon", value: 25 },
    { day: "Tue", value: 22 },
    { day: "Wed", value: 27 },
    { day: "Thu", value: 20 },
    { day: "Fri", value: 25 },
    { day: "Sat", value: 20 },
];

function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg dark:border-slate-700 dark:bg-gray-800 dark:text-slate-100">
                {payload[0].value} cars
            </div>
        );
    }
    return null;
}

export default function Graph() {
    const { isDarkMode } = useDarkMode();
    return (
        <div className="w-full">
            <div className="w-full rounded-xl bg-white p-6 shadow-lg transition-colors duration-300 dark:bg-gray-800">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        Authorized Entries
                    </h2>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-gray-800 dark:text-slate-100 dark:hover:bg-gray-700">
                            Last 7 days{" "}
                            <CalendarIcon className="h-4 w-4 text-slate-500 dark:text-slate-300" />
                        </button>
                    </div>
                </div>

                {/* Chart */}
                <div className="rounded-xl bg-blue-50/50 p-5 dark:bg-primary-900/50">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
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
                                domain={[15, 30]}
                                ticks={[15, 20, 25, 30]}
                                tick={{
                                    fill: isDarkMode ? "#e5e7eb" : "#334155",
                                    fontSize: 12,
                                    fontWeight: 500,
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickMargin={25}
                            />
                            <Tooltip content={<CustomTooltip />} />
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
