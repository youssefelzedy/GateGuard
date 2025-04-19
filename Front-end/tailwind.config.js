/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#f4f6fb",
                    100: "#e7edf7",
                    200: "#cad9ed",
                    300: "#9bb8de",
                    400: "#6594cb",
                    500: "#3f72af",
                    600: "#305c99",
                    700: "#284a7c",
                    800: "#254167",
                    900: "#233857",
                    950: "#17243a",
                },
            },
        },
    },
    plugins: [],
};
