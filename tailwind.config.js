/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
      colors: {
        sb: {
          50: "#f2fafc",
          100: "#e4f3f7",
          200: "#c0e3ed",
          300: "#9fd1e3",
          400: "#61aacf",
          500: "#2c83ba",
          600: "#2572a8",
          700: "#19578c",
          800: "#104070",
          900: "#092b54",
          950: "#041836",
        },
        gray: {
          100: "#D9D9D9",
        },
        primary: {
          300: "#42EEEE",
        },
      },
    },

    primary: {
      DEFAULT: "#42EEEE",
      hover: "#0DDDDD",
    },
    secondary: {
      DEFAULT: "#EBE9E9",
      hover: "#D9D9D9",
    },
  },
  plugins: [],
};
