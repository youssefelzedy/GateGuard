function Logs() {
    return (
        <div className="flex h-full flex-col gap-4 bg-primary-50 p-4">
            <header className="flex flex-col justify-between">
                <h1 className="text-2xl font-bold capitalize text-primary-900">
                    Cars entries tables
                </h1>
                <p className="text-base text-primary-900/50">
                    Here you can view and manage recent car entries.
                </p>
            </header>
            <div className="flex-1"></div>
        </div>
    );
}

export default Logs;
