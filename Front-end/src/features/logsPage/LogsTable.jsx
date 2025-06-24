import Plate from "../../ui/Plate";

// const logs = [
//     {
//         _id: "68542c1b1c065e30f713a86d",
//         plateText: "2-3-9-5-o-b-tt",
//         user: "682615ebda99c0a6bfe73d84",
//         garage: {
//             _id: "680a65522b17d013e41c592d",
//             garageName: "Swefy Sun Mall",
//             id: "680a65522b17d013e41c592d",
//         },
//         action: "Accepted",
//         accessTime: "2025-06-19T15:26:19.658Z",
//     },
//     {
//         _id: "68542c211c065e30f713a86f",
//         plateText: "2-3-9-5-b-tt",
//         user: "68542c211c065e30f713a86e",
//         garage: {
//             _id: "680a65522b17d013e41c592d",
//             garageName: "Swefy Sun Mall",
//             id: "680a65522b17d013e41c592d",
//         },
//         action: "Denied",
//         accessTime: "2025-06-19T15:26:25.729Z",
//     },
//     {
//         _id: "68542c271c065e30f713a871",
//         plateText: "2-3-9-5-b-tt",
//         user: "68542c271c065e30f713a870",
//         garage: {
//             _id: "680a65522b17d013e41c592d",
//             garageName: "Swefy Sun Mall",
//             id: "680a65522b17d013e41c592d",
//         },
//         action: "Denied",
//         accessTime: "2025-06-19T15:26:31.855Z",
//     },
//     {
//         carDetection: [
//             [0, 76.94654083251953, 365.0900573730469, 319.8037414550781, 2],
//         ],
//         plateDetection: [
//             [
//                 24.344873428344727, 256.9582214355469, 89.09928131103516,
//                 292.40753173828125, 0.8505282402038574, 0,
//             ],
//         ],
//         _id: "68542c341c065e30f713a873",
//         plateText: "4-9-7-3-tt",
//         user: "68542c341c065e30f713a872",
//         garage: {
//             _id: "680a65522b17d013e41c592d",
//             garageName: "Swefy Sun Mall",
//             id: "680a65522b17d013e41c592d",
//         },
//         action: "Denied",
//         accessTime: "2025-06-19T15:26:44.335Z",
//     },
//     {
//         carDetection: [
//             [
//                 203.47401428222656, 17.961294174194336, 548.1224975585938,
//                 302.43505859375, 1,
//             ],
//         ],
//         plateDetection: [
//             [
//                 341.6512145996094, 239.9118194580078, 422.8898010253906,
//                 279.5970458984375, 0.8905428051948547, 0,
//             ],
//         ],
//         _id: "68542c3a1c065e30f713a875",
//         plateText: "2-3-9-5-g-b-tt",
//         user: "68542c3a1c065e30f713a874",
//         garage: {
//             _id: "680a65522b17d013e41c592d",
//             garageName: "Swefy Sun Mall",
//             id: "680a65522b17d013e41c592d",
//         },
//         action: "Denied",
//         accessTime: "2025-06-19T15:26:50.333Z",
//     },
//     {
//         carDetection: [
//             [
//                 240.3966522216797, 74.24916076660156, 644.3539428710938,
//                 392.98834228515625, 2,
//             ],
//         ],
//         plateDetection: [
//             [
//                 395.2613830566406, 321.51776123046875, 493.53167724609375,
//                 369.6739501953125, 0.9132472276687622, 0,
//             ],
//         ],
//         _id: "68542c521c065e30f713a877",
//         plateText: "2-3-9-5-2-b-tt",
//         user: "68542c521c065e30f713a876",
//         garage: {
//             _id: "680a65522b17d013e41c592d",
//             garageName: "Swefy Sun Mall",
//             id: "680a65522b17d013e41c592d",
//         },
//         action: "Denied",
//         accessTime: "2025-06-19T15:27:14.714Z",
//     },
// ];

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
                            className={`border-b border-primary-200 transition hover:bg-primary-100 ${
                                index % 2 === 0
                                    ? "bg-primary-50"
                                    : "bg-primary-100"
                            }`}
                        >
                            <td className="p-3">{/* <Plate /> */}</td>
                            <td className="p-3">2023-10-01</td>
                            <td className="p-3">In</td>
                            <td className="p-3">John Doe</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default LogsTable;
