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
    },
  },
  plugins: [],
}

