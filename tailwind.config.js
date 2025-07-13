/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#2E7D32',
      },
      fontFamily:{
        pacifico: ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
}

