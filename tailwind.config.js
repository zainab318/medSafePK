/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
        },
        navy: {
          700: '#1e3a8a',
          800: '#1e293b',
          900: '#0f172a',
        }
      }
    },
  },
  plugins: [],
}

