// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Add this line
    "./public/index.html",          // Add this line if you have an index.html in public folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
