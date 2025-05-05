import Graph from "../components/Dashboard/Graph";
import RecentEntries from "../components/Dashboard/RecentEntries";
import GateControl from "../components/Dashboard/GateControl";
import Time from "../components/Dashboard/Time";
import Calendar from "../components/Dashboard/Calendar";
import NumberOfCars from "../components/Dashboard/NumberOfCars";

function Dashboard() {
    return (
        <div className="grid min-h-screen grid-cols-[3fr_1fr] gap-6 bg-[#f3f4f6] p-6">
            <div className="flex flex-col gap-6">
                <Graph />
                <RecentEntries />
            </div>
            <div className="flex flex-col gap-6">
                <GateControl />
                <Time />
                <Calendar />
                <NumberOfCars />
            </div>
        </div>
    );
}

export default Dashboard;
