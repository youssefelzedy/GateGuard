import LogoDark from "../../assets/Logo_dark.svg";

function HeaderLogin() {
    return (
        <div className="w-full flex justify-center mt-8 mb-6">
            <div className="flex items-center gap-2">
                <img
                    src={LogoDark}
                    alt="Logo"
                    className="h-24 w-auto"
                    onClick={() => (window.location.href = "/")}
                    style={{ cursor: "pointer" }}
                />
            </div>
        </div>
    );
}

export default HeaderLogin;
