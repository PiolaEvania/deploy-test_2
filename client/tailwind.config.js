/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lightGray: '#D9D9D9',
        darkCharcoal: '#2B3741',
        lightCharcoal: '#3c4a57',
        greenA: '#4CAF50',
        darkGreen: '#418E44',
        blueA: '#2196F3',
        darkBlue: '#104B79',
        redA: '#F44336',
        darkRed:'#7A211B',
        yellowA: '#FFC107',
        darkYellow:'#7F6003',
        orangeA: '#FF9800',
        darkOrange:'#7F4C00',
        pinkRed: '#E91E63',
        darkPinkRed:'#740F31',
        lightBlue: '#03A9F4',
        darkLightBlue:'#01547A',
      },
    },
  },
  plugins: [],
};
