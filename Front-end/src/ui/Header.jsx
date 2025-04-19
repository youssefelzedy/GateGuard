import { BellRing, Mail } from "lucide-react";

function Header() {
    return (
        <header className="bg-primary-50 shadow-sm px-6 py-3 flex justify-between items-center">
            <div>
                <h1 className="text-xl text-primary-900 font-bold">
                    Port Said University
                </h1>
                <p className="text-base text-primary-900/50">Hi, Saad Samir</p>
            </div>

            <div className="flex items-center divide-x-2 divide-primary-200">
                <div className="flex items-center gap-4 pr-3">
                    <button className="relative p-2 rounded-full hover:bg-primary-50">
                        <Mail size={20} className="text-primary-800" />
                    </button>
                    <button className="relative p-2 rounded-full hover:bg-primary-50">
                        <BellRing size={20} className="text-primary-800" />
                    </button>
                </div>

                <div className="flex items-center gap-3 pl-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/284a/9d9d/e7b1a7141abef5d003d79da55d70f1a4?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=et1JPpR7hcjQbT2Fr74RPDHWNYjZC6c2j35fGOR8jdHe6rMMaqfoMsFZ6gejJxL9v93qZwiUOBmbA4-BAF-D7pOd45jqPAWbNNhlZP1uY4IPibMk9cMT7qdHyaSmKVbHLqzuFFLQqrJ1ln8FocJfHrJM31yRY0m1ZEFsSDq-06xciWzEZ3kJMkavaDM-rxBJi~~XYKrFBhjLbS0XG1Ah77o0HUkajJn2AOznFE9Yit5exYjSngDjbdgZ6F0uWMiHtIU~pNTyEnmx0dLIOYXxvyn1A-dpX3F946NJTBz63a1fh29WuKzgCB5nK542S-5lCF8U9~UUvtu8jP7T0Pv~Ew__"
                            alt="Saad Samir"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-semibold text-[#112D4E]">
                            Saad Samir
                        </p>
                        <p className="text-xs text-[#112D4E80]">Owner</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
