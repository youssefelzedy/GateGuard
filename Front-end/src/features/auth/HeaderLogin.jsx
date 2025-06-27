import { useDarkMode } from "../../context/DarkModeContext";
import LogoDark from "../../assets/Logo_dark.svg";
import LogoLight from "../../assets/Logo_light.svg";

function HeaderLogin() {
    const { isDarkMode } = useDarkMode();

    return (
        <div className="absolute top-0 flex w-full items-center justify-between p-4 sm:p-6 md:p-8">
            <div className="flex items-center gap-2">
                <img
                    src={!isDarkMode ? LogoLight : LogoDark}
                    alt="Logo"
                    className="h-12 w-auto"
                />
            </div>
        </div>
    );
}

export default HeaderLogin;
