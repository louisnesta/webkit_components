module.exports = {
  theme: {
    extend: {},
    container: {
      center: true
    },
    fontFamily: {
      display: ["Helvetica", "sans-serif"],
      body: ["Open Sans", "sans-serif"]
    },
    textColor: {
      primary: "#00acc1",
      secondary: "#ffed4a",
      body: "#2C3E50",
      danger: "#e3342f",
      white: "#fff"
    },
    backgroundColor: theme => ({
      primary: "#00acc1",
      secondary: "#ffed4a",
      orange: "orangered",
      white: "#fff",
      black: "#000",
      none: "rgba(0,0,0,0)",
      "gray-100": "#fafafa",
      "gray-200": "#efefef",
      "gray-300": "#ddd"
    }),
    borderColor: theme => ({
      default: theme("colors.gray.300", "currentColor"),
      primary: "#00acc1",
      secondary: "#ffed4a",
      danger: "#e3342f",
      gray: "#ddd",
      black: "#000",
      "gray-100": "#fafafa",
      "black-50": "rgba(0,0,0,0.5)",
      "white-50": "rgba(255,255,255,0.3)",
      "gray-200": "#efefef",
      "gray-300": "#ddd"
    })
  },
  variants: {},
  plugins: []
};
