/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
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
            fontFamily: {
                brand: ["IBM Plex Sans", "sans-serif"],
                arabic: ["Noto Naskh Arabic", "serif"],
            },
            keyframes: {
                fadeSlideUp: {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(20px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0px)",
                    },
                },

                float: {
                    "0%": {
                        transform: "translateY(0px) rotate(0deg)",
                    },
                    "50%": {
                        transform: "translateY(-10px) rotate(2deg)",
                    },
                    "100%": {
                        transform: "translateY(0px) rotate(0deg)",
                    },
                },
            },
            animation: {
                fadeSlideUp: "fadeSlideUp 0.5s ease-in-out",
                float: "float 3s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
