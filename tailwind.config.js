/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-green-500",
    "bg-red-500",
    "bg-blue-600",
    "text-white",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      colors: {
        theme: {
          bg: '#FAFAF8',
          card: '#FFFFFF',
          text: '#111111',
          secondary: '#666666',
          border: '#E5E7EB',
          accent: '#2563EB', // subtle blue
          accentHover: '#1D4ED8'
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}