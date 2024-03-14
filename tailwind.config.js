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
        "yellow-222": "#485A0D",
        "purple-111": "#C09FF8",
        'gray-111': '#F0F0F0',
        "orange-111": "#FEC4DD",
        "white-900": "#CDD4F0",
        "dark-900": "#010101"
      },
      fontSize: {
        "36p": "36px",
        "64p": "64px",
      },
      dropShadow: {
        "yellow": '-100px -100px 200px 0px rgba(218, 255, 55, 0.7)'
      },
      boxShadow: {
        "yellow": '-100px -100px 200px 10px #DAFF37B2',
        "purple": '100px -100px 200px 10px #C09FF8B2',
        "pink": '100px 100px 200px 10px #FEC4DDB2',
      },
    },
  },
  plugins: [],
}