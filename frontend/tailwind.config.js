/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f8ff',
          100: '#e0e7ff',
          200: '#c7d2ff',
          300: '#a5b4ff',
          400: '#7f9cff',
          500: '#4f6cff',
          600: '#364ed1',
          700: '#2c3fa8',
          800: '#233382',
          900: '#1b275f',
        },
        slate: {
          950: '#0f172a',
        },
      },
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 20px 45px -20px rgba(15, 23, 42, 0.35)',
      },
      borderRadius: {
        xl: '1.25rem',
      },
    },
  },
  plugins: [],
}

