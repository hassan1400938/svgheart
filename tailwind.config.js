/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extends: {
      fontFamily: {
        trebuc: ["var(--font-trebuc)", "sans-serif"],
      },
      colors: {
        link: "#0d6efd",
        "link-hover": "#0a58ca",
        "theme": "#ee1e6e",
      },
    },
  },
  plugins: [],
};
