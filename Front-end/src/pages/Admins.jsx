import AdminsHeader from "../features/admins/AdminsHeader";
import AdminsTable from "../features/admins/AdminsTable";

function Admins() {
    return (
        <div className="flex h-full flex-col bg-primary-50 p-4">
            <AdminsHeader />
            <AdminsTable />
        </div>
    );
}

export default Admins;
