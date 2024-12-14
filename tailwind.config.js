module.exports = {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        primary: "#006494",
        secondary: "#051923",
        tertiary: "#003554",
      },
      fontFamily: {
        header: ['Montserrat', 'sans-serif'], 
        body: ['Lato', 'sans-serif'],        
      },
    },
  },
  plugins: [],
};
