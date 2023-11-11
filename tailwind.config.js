/** @type {import('tailwindcss').Config} */
export default {
  content: ["./node_modules/flowbite/**/*.js", "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"]
    },
    extend: {}
  },
  plugins: [require("flowbite/plugin")]
};
