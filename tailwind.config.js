/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        "1250p": "1250px"
      },
      colors: {
        "yellow-111": "#C6F432",
        "white-900": "#CDD4F0",
        "dark-900": "#010101"
      },
      fontSize: {
        "36p": "36px",
        "64p": "64px",
      }
    },
  },
  plugins: [],
}