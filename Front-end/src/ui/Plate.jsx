import { convertEnglishToArabic } from "../utils/helper";

function Plate({ carPlate, formNumbers, formLetters }) {
    if (!carPlate && formNumbers && formLetters) {
        carPlate = [...formNumbers, ...formLetters].filter(Boolean).join("-");
    }
    const { numbers, letters } = convertEnglishToArabic(carPlate?.split("-"));
    return (
        <div className="flex h-20 w-40 flex-col border border-black text-lg">
            <div className="flex items-center justify-between bg-primary-700 px-2 font-bold text-white">
                <span>EGYPT</span>
                <span className="font-arabic">مصر</span>
            </div>
            <div className="grid grow grid-cols-2 font-arabic text-2xl font-bold text-black">
                <div className="flex h-full items-center justify-center gap-1 border-r border-black">
                    {numbers.map((number, index) => (
                        <span
                            key={index}
                            className="flex items-center justify-center"
                        >
                            {number}
                        </span>
                    ))}
                </div>
                <div className="flex h-full items-center justify-center gap-1">
                    {letters.map((letter, index) => (
                        <span
                            key={index}
                            className="flex items-center justify-center"
                        >
                            {letter}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Plate;
