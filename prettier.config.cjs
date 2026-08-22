/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindStylesheet: "./src/styles/globals.css",
};
