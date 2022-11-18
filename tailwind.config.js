//  @type {import('tailwindcss').Config} 
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
      beige:{
        100: '#ede0d3',
        200: '#d3b393',
      },
      },
      backgroundImage: {
      'baner-img': "url('/images/header/banner.jpg')",
      'baner-start': "url('/images/header/startsidabak.jpg')"   
      },
      fontFamily:{
      'josefin-Regular': ['"Josefin Sans"', 'sans-serif']
      },
   
   }
  },
  plugins: [require('flowbite/plugin')],
};


// url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap')
