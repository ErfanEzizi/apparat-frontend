/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: {
          darkest: "#0D1B2A",
          dark: "#1B263B",
          DEFAULT: "#415A77",
          light: "#778DA9",
          lightest: "#E0E1DD",
          iceblack: "#000000"
        },
      },
    },
  },
  plugins: [],
};