const {heroui} = require('@heroui/theme');
const defaultTheme = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./node_modules/@heroui/theme/dist/components/(alert|avatar|button|card|checkbox|input|link|listbox|popover|ripple|spinner|form|divider).js"
  ],
  theme: {
    extend: {
      height: {
        navbar: "50px"
      },
      fontFamily: {
        "sans": ['"Manrope"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [heroui({
    layout: {
      radius: {
        small: 5,
        medium: 7,
        large: 10,
      },
      navbarHeight: 16,

    },
    themes: {
      light: {
        colors: {
          background: "#ebf3ff",
          foreground: "#0B1317",
          primary: {
            "500": "#FFFFFF"
          },
          secondary: {
            foreground: "#FFFFFF",
            DEFAULT: "#2292fc",
          },
        }
      },
      dark: {
        colors: {
          background: "#0B1317",
          primary: {
            "500": "#1E222B"
          },
          secondary: {
            foreground: "#FFFFFF",
            DEFAULT: "#2292fc",
          }
        }
      }
    }
  })],
}

