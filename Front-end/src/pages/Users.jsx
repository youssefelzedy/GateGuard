import UsersHeader from "../features/users/UsersHeader";
import UsersTable from "../features/users/UsersTable";

function Users() {
    return (
        <div className="flex h-full flex-col bg-primary-50 p-4 transition-colors duration-300 dark:bg-gray-900">
            <UsersHeader />
            <UsersTable />
        </div>
    );
}

export default Users;
