/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "nunito" : ["Nunito", "sans-serif"],
        "montserrat" : ["Montserrat", "sans-serif"],
      },
      colors: {
        "tofu-pink" : '#FAB2FF',
        "tofu-yellow" : '#FFFBCE',
        "tofu-blue" : "#8CCBFF",
        "tofu-grey" : "#E2E2E2",
      }
    },
  },
  plugins: [],
}

