/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}"
  ],
  theme: {
    extend: {
      // boxShadow : {
      //   "lg": "2px 2px 10px 1px rgba(0,0,0,0.1)",
      // },
      width : {
        "116" : "29rem",
        "132" : "33rem"
      },
      fontSize : {
        "tiny" : "0.75rem"
      }
    },
  },
  plugins: [],
}
