/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        cyan: "0 4px 6px -1px #0ff, 0 2px 4px -2px #0ff", // Custom box shadow with cyan color
      },
    },
  },
  plugins: [],
};
