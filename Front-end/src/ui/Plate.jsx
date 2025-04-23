function Plate() {
    return (
        <div className="flex h-20 w-36 flex-col border border-black text-lg">
            <div className="flex items-center justify-between bg-primary-700 px-1 font-bold text-white">
                <span>EGYPT</span>
                <span className="font-arabic">مصر</span>
            </div>

            <div className="grid grow grid-cols-2 font-arabic text-xl font-bold text-black">
                <div className="flex items-center justify-center border-r border-black">
                    ٣ ٩ ٤ ٥
                </div>
                <div className="flex items-center justify-center">ط ب ج</div>
            </div>
        </div>
    );
}

export default Plate;
