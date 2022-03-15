const colors = require('./src/configs/color')

module.exports = {
  prefix: 'tw-',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1336px',
        '2xl': '1920px',
      },
      colors
    }
  },
  plugins: [],
}
