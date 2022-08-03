const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: colors.blue,
        info: colors.blue,
        danger: colors.red,
        success: colors.green,
      }
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'body': { color: theme('colors.gray.800') },
      })
    })
  ]
}
