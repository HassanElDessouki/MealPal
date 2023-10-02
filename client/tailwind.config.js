/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#041F03",
        textInputStroke: "#B7EDB6",
        container: "#0D2B0D",
        button: "#00A023",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
