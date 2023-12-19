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
        poppins: ["Poppins", "sans-serif"],
        quantico: ["Quantico", "sans-serif"],
      },
    },
  },
  plugins: [],
};

// colors: {
//   backgrounddark: "#020617",
//   backgroundlight: "#111827",
//   textlight: "#6B7280",
//   textdark: "#EAB308",
//   buttons:"#FACC15",
//   stark:"#DFF6FF"
// },
