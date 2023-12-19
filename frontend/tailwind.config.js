/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundDark: "#020617",
        backgroundLight: "#111827",
        textWhite: "#EEEEEE",
        textLight: "#EAB308",
        textDark: "#6B7280",
        buttonPrimary: "#EAB308",
        buttonSecondary: "#FACC15",
      },
      fontFamily: {
        poppins: ["Poppins"],
        quantico: ["Quantico", "sans-serif"],
      },
    },
  },
  plugins: [],
};
