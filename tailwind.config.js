import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd3",
          200: "#ffd9a5",
          300: "#ffbd6d",
          400: "#ff9a33",
          500: "#fb7c0c",
          600: "#ec5f06",
          700: "#c34509",
          800: "#9c360f",
          900: "#7e2e10",
          950: "#441505",
        },
        ink: {
          50: "#f4f6f8",
          100: "#e5e9ee",
          200: "#c9d1db",
          300: "#9fadc0",
          400: "#6f829c",
          500: "#526181",
          600: "#404d6b",
          700: "#343e57",
          800: "#242b3d",
          900: "#171b28",
          950: "#0d0f17",
        },
      },
      animation: {
        blink: "blink 1s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.4s ease-out both",
      },
      keyframes: {
        blink: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(0.75rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
