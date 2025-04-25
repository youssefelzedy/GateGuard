// Arabic to English Maps

// const arabicToEnglishLetters = new Map([
//     ["أ", "alif"],
//     ["ب", "baa"],
//     ["ج", "jeem"],
//     ["د", "daal"],
//     ["ر", "raa"],
//     ["س", "seen"],
//     ["ص", "saad"],
//     ["ط", "Taa"],
//     ["ع", "ain"],
//     ["ف", "faa"],
//     ["ق", "qaaf"],
//     ["ل", "laam"],
//     ["م", "meem"],
//     ["ن", "noon"],
//     ["هـ", "haa"],
//     ["و", "waw"],
//     ["ي", "yaa"],
// ]);

// const arabicToEnglishNumbers = new Map([
//     ["٠", "0"],
//     ["١", "1"],
//     ["٢", "2"],
//     ["٣", "3"],
//     ["٤", "4"],
//     ["٥", "5"],
//     ["٦", "6"],
//     ["٧", "7"],
//     ["٨", "8"],
//     ["٩", "9"],
// ]);

// Function to convert Arabic numbers to English
// const convertArabicToEnglish = input => {
//     let letters = "";
//     let numbers = "";
//     for (let char of input) {
//         // Check if the character is Arabic letter or number
//         if (arabicToEnglishLetters.has(char)) {
//             letters += arabicToEnglishLetters.get(char);
//             continue;
//         }
//         if (arabicToEnglishNumbers.has(char)) {
//             numbers += arabicToEnglishNumbers.get(char);
//             continue;
//         }
//     }
//     return { numbers, letters };
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const englishToArabicLetters = new Map([
    ["alif", "أ"],
    ["baa", "ب"],
    ["jeem", "ج"],
    ["daal", "د"],
    ["raa", "ر"],
    ["seen", "س"],
    ["saad", "ص"],
    ["Taa", "ط"],
    ["ain", "ع"],
    ["faa", "ف"],
    ["qaaf", "ق"],
    ["laam", "ل"],
    ["meem", "م"],
    ["noon", "ن"],
    ["haa", "هـ"],
    ["waw", "و"],
    ["yaa", "ي"],
]);
const englishToArabicNumbers = new Map([
    ["0", "٠"],
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

    return { numbers, letters };
};
