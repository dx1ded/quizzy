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
      },
      keyframes: {
        fadeIn: {
          "0%": { transform: "translate(-6rem)", opacity: "0" },
          "100%": { transform: "translate(0)", opacity: "1" }
        },
        appear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100%" }
        }
      },
      gridTemplateColumns: {
        "reports-table": "1rem repeat(3, 1fr) 1.5rem"
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out forwards",
        appear: "appear 0.5s ease-in-out forwards"
      }
    },
    screens: {
      xl: { max: "80rem" }, // 1280px
      lg: { max: "64rem" }, // 1024px
      md: { max: "48rem" }, // 768px
      sm: { max: "36rem" }, // 576px
      xs: { max: "26.25rem" }, // 420px
      xss: { max: "23.4375rem" } // 375px
    }
  },
}
