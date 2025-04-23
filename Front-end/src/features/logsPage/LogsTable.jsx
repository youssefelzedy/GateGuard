import Plate from "../../ui/Plate";

// const colors = {
//     Accepted: "bg-green-500",
//     denied: "bg-red-500",
//     manual: "bg-blue-500",
// };

function LogsTable() {
    return (
        <div className="mt-6">
            <table className="w-full table-auto border-collapse rounded-3xl text-left">
                <thead>
                    <tr className="bg-primary-100 font-medium text-primary-900">
                        <th className="p-3">Plate Number</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">State</th>
                        <th className="p-3">User Name</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                        <tr
                            key={item}
                            className={`border-b border-primary-200 transition hover:bg-primary-100 ${index % 2 === 0 ? "bg-primary-50" : "bg-primary-200"}`}
                        >
                            <td className="p-3">
                                <Plate />
                            </td>
                            <td className="p-3">2023-10-01</td>
                            <td className={`p-3`}>In</td>
                            <td className="p-3">John Doe</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LogsTable;
