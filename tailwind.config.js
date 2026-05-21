/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          100: "#ede0d3",
          200: "#d3b393",
        },
      },
      backgroundImage: {
        "baner-img": "url('/images/header/banner.jpg')",
        "baner-start": "url('/images/header/startsidabak.jpg')",
      },
      fontFamily: {
        "josefin-Regular": ['"Josefin Sans"', "sans-serif"],
        "josefin-Thin": ['"Josefin Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
