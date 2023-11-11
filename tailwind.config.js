/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./node_modules/flowbite/**/*.js", "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"]
    },
    extend: {}
  },
  plugins: [require("flowbite/plugin")]
};
