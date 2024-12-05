/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#56a6d7",
        "midnight-blue": "#5779c2",
      },
      width: {
        primary: "#56a6d7",
      },
      borderColor: {
        midnight: "#0505056e",
      },
    },
  },
  plugins: [],
};
