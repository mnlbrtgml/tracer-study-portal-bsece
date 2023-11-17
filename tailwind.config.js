/** @type {import('tailwindcss').Config} */
export default {
  content: ["./node_modules/flowbite/**/*.js", "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"]
    },
    extend: {
      width: {
        active: "var(--width)"
      },
      translate: {
        active: "var(--translate)"
      }
    }
  },
  plugins: [require("flowbite/plugin")]
};
