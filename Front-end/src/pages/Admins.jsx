import toast from "react-hot-toast";
import { Navigate } from "react-router";
import AdminsHeader from "../features/admins/AdminsHeader";
import AdminsTable from "../features/admins/AdminsTable";
import { useAdmin } from "../features/auth/useAdmin";

function Admins() {
    const { isOwner } = useAdmin();
    if (isOwner) {
        return (
            <div className="flex h-full flex-col bg-primary-50 p-4 transition-colors duration-300 dark:bg-gray-900">
                <AdminsHeader />
                <AdminsTable />
            </div>
        );
    } else {
        toast.error("You are not authorized to view this page.");
        return <Navigate to="/dashboard" replace={true} />;
    }
}

export default Admins;
