import UsersTable from "../features/users/UsersTable";

function Users() {
    return (
        <div className="flex h-full flex-col gap-4 bg-primary-50 p-4">
            <h1 className="text-2xl font-bold capitalize text-primary-900">
                Users tables
            </h1>
            <div className="flex-1">
                <UsersTable />
            </div>
        </div>
    );
}

export default Users;
