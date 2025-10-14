/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#faefde",
          100: "#f6e7d3",
          200: "#fff1e2",
        },
        gold: {
          300: "#e9c98a",
          600: "#c79a4b",
          700: "#b5802f",
        },
        brown: {
          800: "#5a4639",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(60,40,20,.15)",
        card: "0 6px 18px rgba(149,112,53,.12)",
      },
      borderRadius: {
        xl2: "22px",
      },
    },
  },
  plugins: [],
};
