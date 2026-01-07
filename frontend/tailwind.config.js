/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        outlook: {
          blue: '#0078d4',
          lightBlue: '#deecf9',
          darkBlue: '#106ebe',
          gray: '#f3f2f1',
          darkGray: '#605e5c',
          border: '#edebe9'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
          inria: ['"Inria Serif"', 'serif'],
      },
      keyframes: {
        'cloud-slow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(500px)' }
        },
        'cloud-medium': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(500px)' }
        },
        'cloud-fast': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(500px)' }
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        'cloud-slow': 'cloud-slow 25s linear infinite',
        'cloud-medium': 'cloud-medium 18s linear infinite',
        'cloud-fast': 'cloud-fast 12s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out'
      }
    },
  },
  plugins: [],
}