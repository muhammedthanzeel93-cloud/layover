/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-bg': '#080D1B',
        'surface-card': '#141D30',
        'surface-secondary': '#1B263C',
        'text-primary': '#F5F7FF',
        'text-muted': '#A6B1C8',
        'accent-yellow': '#FFB21A',
        'accent-orange': '#FFB21A',
        'accent-cyan': '#12C8E8',
        'accent-green': '#24D69A',
        'border-subtle': '#1E293B',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Geist', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
