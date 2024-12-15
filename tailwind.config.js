export default {
  content: ['./**/*.{html,js}', '!./node_modules/**/*'], 
  theme: {
    extend: {
      colors: {
        primary: '#006494',
        secondary: '#051923',
        tertiary: '#003554',
        white: '#ffffff',
      },
      fontFamily: {
        header: ['Montserrat', 'sans-serif'], 
        body: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
