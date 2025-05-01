/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  // Add a custom layer for component classes
  layer: {
    components: {
      '.btn': {
        '@apply px-5 py-2 rounded-full shadow-md font-[gaegu] text-lg font-bold transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg hover:scale-105':
          {},
      },
      '.btn-green': {
        '@apply bg-gradient-to-r from-green-400 to-emerald-500 text-white': {},
      },
      '.btn-amber': {
        '@apply bg-gradient-to-r from-amber-400 to-orange-500 text-white': {},
      },
      '.btn-blue': {
        '@apply bg-gradient-to-r from-blue-400 to-indigo-500 text-white': {},
      },
      '.btn-red': {
        '@apply bg-gradient-to-r from-red-400 to-rose-500 text-white': {},
      },
    },
  },
};
