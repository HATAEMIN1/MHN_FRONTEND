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
        gray: {
          100: "#EEEEEE",
          200: "#B6B6B6",
          300: "#888888",
          400: "#CCCCCC",
          500: "#e4e4e4",
          600: "#f1f1f4",
          700: "#dbdfe9",
          800: "#666666",
        },
        primary: {
          100: "#1139E8",
          200: "#3E7DDC",
          300: "#212121",
          400: "#FFFFFF",
        },
        blue: {
          100: "#3E7DDC",
          200: "#9BC3FF",
          300: "#C7DDFF",
        },
        sub: {
          100: "#555555",
          200: "#3C3C3C",
          300: "#E9EBEC",
          400: "#fcfcfc",
        },
      },
      boxShadow: {
        "custom-shadow": "4px 8px 4px rgba(0, 0, 0, 0.25)",
      },
    },

    primary: {
      DEFAULT: "#1139E8",
      hover: "#3E7DDC",
    },
    secondary: {
      DEFAULT: "#EBE9E9",
      hover: "#D9D9D9",
    },

    // ============================
    // extend: {
    //   colors: {
    //     sb: {
    //       50: "#f2fafc",
    //       100: "#e4f3f7",
    //       200: "#c0e3ed",
    //       300: "#9fd1e3",
    //       400: "#61aacf",
    //       500: "#2c83ba",
    //       600: "#2572a8",
    //       700: "#19578c",
    //       800: "#104070",
    //       900: "#092b54",
    //       950: "#041836",
    //     },
    //     gray: {
    //       100: "#D9D9D9",
    //     },
    //     primary: {
    //       300: "#42EEEE",
    //     },
    //   },
    // },

    // primary: {
    //   DEFAULT: "#42EEEE",
    //   hover: "#0DDDDD",
    // },
    // secondary: {
    //   DEFAULT: "#EBE9E9",
    //   hover: "#D9D9D9",
    // },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"), // aspect-ratio 플러그인을 추가
  ],
};
