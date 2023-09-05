/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    backgroundColor: (theme) => ({
      primary: "#020617",
      secondary: "#64748B",
      githubButton: "#1F2937",
      decorativeGreen: "#73FCC2",
    }),
    extend: {
      colors: {
        decorativeGreen: "#73FCC2",
        buttonTextBlack: "#020617",
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "emerald",
      {
        mytheme: {
          primary: "#fc4d3a",

          secondary: "#a9a2f9",

          accent: "#fce6bd",

          neutral: "#2d223a",

          "base-100": "#e7e6ea",

          info: "#3fbfde",

          success: "#60d7c1",

          warning: "#d8a013",

          error: "#f44372",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
