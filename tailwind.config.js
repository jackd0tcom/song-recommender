/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src"],
  theme: {
    extend: {
      animation: {
        animate: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
