/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00FFA3', // Vibrant eco-green
        secondary: '#00B8FF', // Futuristic blue
        accent: '#FF00FF', // Neon pink for highlights
        dark: '#0A0A0A', // Deep black
        light: '#F0F0F0', // Off-white
        eco: {
          green: '#00FFA3',
          blue: '#00B8FF',
          purple: '#8A2BE2',
          dark: '#0A0A0A',
          light: '#F0F0F0',
        }
      },
      fontFamily: {
        futura: ['Futura', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 255, 163, 0.5)',
        'glow-lg': '0 0 30px rgba(0, 255, 163, 0.7)',
      }
    },
  },
  plugins: [],
}

