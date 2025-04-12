/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: '#D6D8DE',
          100: '#CED1D7',
          200: '#C5C9D1',
          300: '#BDC1CA',
          400: '#A2A8B4',
          500: '#878E9E',
        },
        primary: {
          50: '#50a7e9',
          100: '#69b3ec',
          200: '#82c0ef',
          300: '#379AE6',
          400: '#1f1c89de',
          500: '#1876be',
        },
        secondary: {
          50: '#A4B5EE',
          100: '#8DA3EA',
          200: '#7691E6',
          300: '#496CDD',
          400: '#2A53D7',
          500: '#2346BA',
        },
        success: {
          50: '#6DEB97',
          100: '#4FE782',
          200: '#32E36D',
          300: '#1DD75B',
          400: '#19BC50',
          500: '#16A144',
        },
        warning: {
          50: '#e25458',
          100: '#e66c70',
          200: '#ea8588',
          300: '#DE3840',
          400: '#d22329',
          500: '#b41e23',
        },
      }
    }
  },
  plugins: [],
}
