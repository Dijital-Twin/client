/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        "1250p": "1250px"
      },
      colors: {
        "white-900": "#CDD4F0",
        "dark-900": "#010101"
      }
    },
  },
  plugins: [],
}