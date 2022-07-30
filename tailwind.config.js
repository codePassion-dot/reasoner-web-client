module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cerulean: "#0A6AA6",
        seagull: "#7EB6D9",
        denim: "#0D5FA6",
        "cloud-burst": "#354050",
        midnight: "#29323E",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        "3xl": "-1px -1px 24px 3px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        default: "url('~/public/background.svg')",
      },
      screens: {
        "3xl": "1910px",
        "4xl": "2010px",
      },
    },
  },
  plugins: [],
};
