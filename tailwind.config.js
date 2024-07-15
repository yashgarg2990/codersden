/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        maincolor : '#121212'
      },
      fontWeight: {
        lessbold: '650',
      },
      keyframes: {
        fill: {
          '0%': { backgroundColor: 'bg-slate-800' },
          '50%': { backgroundColor: 'bg-slate-700' },
          '100%': { backgroundColor: 'bg-slate-900' },
        },
        unfill: {
          '0%': { backgroundColor: 'bg-slate-900' },
          '50%': { backgroundColor: 'bg-slate-700' },
          '100%': { backgroundColor: 'bg-slate-800' },
        },
      },
      animation: {
        fill: 'fill 0.5s ease-in-out forwards',
        unfill: 'unfill 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

