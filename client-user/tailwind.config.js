/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        promos: '#FFA461',
        donuts: '#F7E7C3',
        beverage: '#DC9A78',
        cookies: '#FDBE6E',
        hampers: '#D6E7B0',
        others: '#FEE9CE',
        text: '#763627',
        'background-content': '#F7F7F7',
      },
    },
  },
  plugins: [],
};
