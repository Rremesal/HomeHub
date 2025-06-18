const { heroui } = require('@heroui/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.jsx",
    "../../node_modules/@heroui/theme/dist/components/(button|input|card).js"
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: "#E2F1FA",
          primary: {
            DEFAULT: "#2494C5",
            foreground: "#272E35"
          }
        }
      },
      dark: {
        colors: {
          background: "#272E35",
          primary: {
            DEFAULT: "#2494C5",
            foreground: "#E2F1FA"
          }
        }
      }
    }
  })],
}

