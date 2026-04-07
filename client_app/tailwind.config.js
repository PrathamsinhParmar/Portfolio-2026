/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#f5f5f5',
        muted: '#a1a1aa',
        accent1: '#ccff00', // Neon Yellow
        accent2: '#00f0ff', // Electric Cyan
        accent3: '#ff0055', // Hot Pink
        accent4: '#7000ff', // Vivid Purple
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
