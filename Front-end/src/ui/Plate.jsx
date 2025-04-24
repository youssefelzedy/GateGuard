function Plate({ letters = "", numbers = "" }) {
    return (
        <div className="flex h-20 w-40 flex-col border border-black text-lg">
            <div className="flex items-center justify-between bg-primary-700 px-1 font-bold text-white">
                <span>EGYPT</span>
                <span className="font-arabic">مصر</span>
            </div>

            <div className="grid grow grid-cols-2 p-1 font-arabic text-2xl font-bold text-black">
                <div className="flex items-center justify-center border-r border-black">
                    {numbers}
                </div>
                <div className="flex items-center justify-center gap-2">
                    {letters.map((letter, index) => (
                        <span key={index} className="flex justify-center">
                            {letter}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Plate;
