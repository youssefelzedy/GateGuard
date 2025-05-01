import { Steps } from "primereact/steps";
import { AtSign, User } from "lucide-react";

function StepNavigation({ activeIndex, handleStepClick }) {
    const itemRenderer = (item, itemIndex) => {
        const isActiveItem = activeIndex === itemIndex;
        const backgroundColor = isActiveItem
            ? "var(--primary-color)"
            : "var(--surface-b)";
        const textColor = isActiveItem
            ? "var(--surface-b)"
            : "var(--text-color-secondary)";

        return (
            <div
                className="flex cursor-pointer flex-col items-center"
                onClick={() => handleStepClick(itemIndex)}
            >
                <span
                    className="align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-3rem w-3rem z-1 inline-flex cursor-pointer"
                    style={{
                        backgroundColor: backgroundColor,
                        color: textColor,
                        marginTop: "-25px",
                    }}
                >
                    {item.icon}
                </span>
                <small className="mt-2 text-sm text-primary-800">
                    {item.label}
                </small>
            </div>
        );
    };

    const steps = [
        {
            icon: (
                <AtSign
                    size={48}
                    className={`m-2 rounded-2xl ${
                        activeIndex === 0
                            ? "bg-primary-800 stroke-primary-50"
                            : "bg-primary-50 stroke-primary-800/50"
                    } p-2`}
                />
            ),
            label: "Account",
            template: (item) => itemRenderer(item, 0),
        },
        {
            icon: (
                <User
                    size={48}
                    className={`m-2 rounded-2xl ${
                        activeIndex === 1
                            ? "bg-primary-800 stroke-primary-50"
                            : "bg-primary-50 stroke-primary-800/50"
                    } p-2`}
                />
            ),
            label: "Admin Info",
            template: (item) => itemRenderer(item, 1),
        },
    ];

    return (
        <div className="relative mb-6 py-8">
            <div className="absolute left-1/2 top-8 z-0 h-1 w-[55%] -translate-x-1/2 rounded-full bg-gray-300" />
            <div
                className={`absolute top-8 z-0 h-1 translate-x-1/2 rounded-full bg-primary-700 transition-all duration-300 ${
                    activeIndex === 0
                        ? "hidden"
                        : activeIndex === 1
                          ? "left-0 w-[47%]"
                          : "left-1/3 w-[35%]"
                }`}
            />
            <Steps
                model={steps}
                activeIndex={activeIndex}
                readOnly={false}
                className="steps-custom"
            />
        </div>
    );
}

export default StepNavigation;
