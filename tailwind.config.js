const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    // Aquí asegúrate de que estén los archivos donde usas Tailwind
  ],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
      },
    },
  },
  plugins: [],
}