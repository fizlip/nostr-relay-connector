const { url } = require("inspector");

module.exports = {
  content: ['./common/**/*.{js,ts,jsx,tsx}', './modules/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'f4-turk': '#1be074',
      },
      fontFamily: {
        'allCaps': ['Staatliches', 'allCaps'],
        'roboto': ['Roboto', 'arial'],
        'headline': ["Knewave", 'arial'],
        'montserrat': ["Montserrat", "arial"]
      },
      boxShadow: {
        'f4-light': '5px 5px 0px 1px black',
        'f4-dark': '5px 5px 0px 1px #5a09b0',
      },
      backgroundImage: {
        'hero-pattern': url('https://wallpapercave.com/wp/wp3106267.jpg')
      }
    },
  },
  plugins: [
    require("tailwindcss-scoped-groups"),
  ],
  darkMode: 'class'
}
