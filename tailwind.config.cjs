const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        'navbar-dark-blue': '#001530'
      }
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("daisyui"),
  ],
  daisyui: {
    themes: ["winter"],
  }
};
