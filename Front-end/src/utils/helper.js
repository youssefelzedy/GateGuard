// Arabic to English Maps

const arabicToEnglish = new Map([
    ["ا", "a"],
    ["ب", "b"],
    ["ج", "g"],
    ["د", "d"],
    ["ر", "r"],
    ["س", "s"],
    ["ص", "ss"],
    ["ط", "tt"],
    ["ع", "o"],
    ["ف", "f"],
    ["ق", "kk"],
    ["ل", "l"],
    ["م", "m"],
    ["ن", "n"],
    ["ه", "00"],
    ["و", "w"],
    ["ي", "y"],
    ["١", "1"],
    ["٢", "2"],
    ["٣", "3"],
    ["٤", "4"],
    ["٥", "5"],
    ["٦", "6"],
    ["٧", "7"],
    ["٨", "8"],
    ["٩", "9"],
]);

// Function to convert Arabic numbers to English

export const convertArabicToEnglish = (input) => {
    let output = "";
    for (let char of input) {
        if (arabicToEnglish.has(char)) {
            output += arabicToEnglish.get(char) + "-";
            continue;
        }
    }
    // Remove the last hyphen if it exists
    if (output.endsWith("-")) {
        output = output.slice(0, -1);
    }
    return output;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const englishToArabicLetters = new Map([
    ["a", "ا"],
    ["b", "ب"],
    ["g", "ج"],
    ["d", "د"],
    ["r", "ر"],
    ["s", "س"],
    ["ss", "ص"],
    ["tt", "ط"],
    ["o", "ع"],
    ["f", "ف"],
    ["kk", "ق"],
    ["l", "ل"],
    ["m", "م"],
    ["n", "ن"],
    ["00", "ه"],
    ["w", "و"],
    ["y", "ي"],
]);

const englishToArabicNumbers = new Map([
    ["1", "١"],
    ["2", "٢"],
    ["3", "٣"],
    ["4", "٤"],
    ["5", "٥"],
    ["6", "٦"],
    ["7", "٧"],
    ["8", "٨"],
    ["9", "٩"],
]);

// Function to convert English numbers to Arabic
export const convertEnglishToArabic = (input) => {
    let letters = [];
    let numbers = [];
    for (let char of input) {
        if (englishToArabicLetters.has(char)) {
            letters.push(englishToArabicLetters.get(char));
            continue;
        }
        if (englishToArabicNumbers.has(char)) {
            numbers.push(englishToArabicNumbers.get(char));
            continue;
        }
    }
    // const stringPlate = [...letters, ...numbers].join("");

    return { numbers, letters };
};
