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
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
}