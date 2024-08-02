/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backDrop: "rgba(63, 69, 76, 0.8)",
      },
    },
  },
  plugins: [],
};
