/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        greenLight: 'hsl(148, 38%, 91%)',
        greenDark: 'hsl(169, 82%, 27%)',
        redPrimary: 'hsl(0, 66%, 54%)',
        greyMid: 'hsl(186, 15%, 59%)',
        greyDark: 'hsl(187, 24%, 22%)'
      },
      fontFamily: {
        karla: ['Karla', 'sans-serif']
      }
    },
  },
  plugins: [],
}
