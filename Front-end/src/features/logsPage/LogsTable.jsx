import Plate from "../../ui/Plate";
function LogsTable() {
    return (
        <div className="mt-6">
            <table className="w-full table-auto border-collapse text-left">
                <thead>
                    <tr className="bg-primary-100 font-medium text-primary-900">
                        <th className="p-3">Plate Number</th>
                        <th className="p-3">User Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <tr
                            key={item}
                            className="border-b border-primary-200 transition hover:bg-primary-50"
                        >
                            <td className="p-3 text-primary-900">
                                <Plate />
                            </td>
                            <td className="p-3 text-primary-900">John Doe</td>
                            <td className="p-3 text-primary-900">
                                JohnDoe@JohnDoe.com
                            </td>
                            <td className="p-3 text-primary-900">123456789</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LogsTable;
