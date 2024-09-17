/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Suse: ["SUSE", "sans-serif"],
      },
      boxShadow: {
        "3xl": "0 15px 35px rgba(0, 0, 0, 0.5);",
      },
      backgroundColor: {
        "grey-200": "#1f2937",
      },
      height: {
        "1/13": "13%",
        "7/10": "70%",
        "1/10": "10%",
        "1/20": "5%",
        "19/10": "83%",
      },
      width: {
        "19/10": "83%",
        "3/10": "30%",
        "7/10": "70%",
        "9/10": "90%",
      },
      textColor: {
        "grey-200": "#1f2937",
      },
      borderColor: {
        "grey-200": "#1f2937",
      },
    },
  },
  plugins: [],
};
