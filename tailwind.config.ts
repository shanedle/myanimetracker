/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2e51a2",
        grey: "#888",
        dark: "#313154",
      },
    },
  },
  plugins: [],
};
