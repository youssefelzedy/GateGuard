import {
    arabicToEnglish,
    englishToArabicLetters,
    englishToArabicNumbers,
} from "./constants";

export const convertArabicToEnglish = (input: string) => {
    let output = "";
    for (const char of input) {
        if (arabicToEnglish.has(char)) {
            output += arabicToEnglish.get(char) + "-";
            continue;
        }
    }
    if (output.endsWith("-")) {
        output = output.slice(0, -1);
    }
    return output;
};

// Function to convert English numbers to Arabic
export const convertEnglishToArabic = (input: string[]) => {
    const letters: string[] = [];
    const numbers: string[] = [];
    for (const char of input) {
        if (englishToArabicLetters.has(char)) {
            letters.push(englishToArabicLetters.get(char)!);
            continue;
        }
        if (englishToArabicNumbers.has(char)) {
            numbers.push(englishToArabicNumbers.get(char)!);
            continue;
        }
    }
    return { numbers, letters };
};
