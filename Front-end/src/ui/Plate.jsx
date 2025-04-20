function Plate() {
    return (
        <div className="flex h-[80px] w-[165px] flex-col border border-black text-lg">
            {/* Top blue section */}
            <div className="flex items-center justify-between bg-primary-700 px-2 font-bold text-white">
                <span>EGYPT</span>
                <span className="font-arabic">مصر</span>
            </div>

            <div className="grid flex-1 grid-cols-2 content-center text-center font-arabic text-2xl font-bold text-black">
                <div className="flex items-center justify-center border-r border-black">
                    ٣ ٩ ٤ ٥
                </div>
                <div className="flex items-center justify-center">ط ب ج</div>
            </div>
        </div>
    );
}

export default Plate;
