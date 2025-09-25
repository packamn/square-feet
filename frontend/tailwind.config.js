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
        elevate: '0 30px 60px -30px rgba(15, 23, 42, 0.45)',
        panel: '0 25px 50px -20px rgba(15, 23, 42, 0.25)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease forwards',
        slideUp: 'slideUp 0.5s ease forwards',
        scaleIn: 'scaleIn 0.35s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: 0, transform: 'scale(0.96)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

