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
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          '&::-webkit-scrollbar': {
            width: '6px',
          },
        },
        '.scrollbar-thumb-blue-500': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#3b82f6',
          },
        },
        '.scrollbar-thumb-blue-400': {
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#60a5fa',
            boxShadow: '0 0 8px 2px rgba(96, 165, 250, 0.5)',
          },
        },
        '.scrollbar-thumb-green-500': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#10b981',
          },
        },
        '.scrollbar-thumb-green-400': {
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#34d399',
            boxShadow: '0 0 8px 2px rgba(52, 211, 153, 0.5)',
          },
        },
        '.scrollbar-track-gray-800': {
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#1f2937',
          },
        },
        '.scrollbar-thumb-rounded-full': {
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '9999px',
          },
        },
        '.scrollbar-track-rounded-full': {
          '&::-webkit-scrollbar-track': {
            borderRadius: '9999px',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}