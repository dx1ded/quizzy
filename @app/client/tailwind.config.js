/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#273ED4",
        "secondary": "#FFB800",
        "accent": "#DFCFF9",
        "gray": "#C8C8C8"
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        lobster: ["Lobster Two"]
      },
      fontSize: {
        "3xl": "2rem"
      }
    }
  },
  plugins: [],
}
