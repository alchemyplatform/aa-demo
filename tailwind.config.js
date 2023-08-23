/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
      fontFamily: {
        NeueMontrealRegular: ["PPNeauMontreal-Regular", "Helvetica"],
        NeueMontrealSemiBold: ["PPNeueMontreal-SemiBold", "Helvetica"],
        NeueMontrealBold: ["PPNeueMontreal-Bold", "Helvetica"],
        PublicSansRegular: ["PublicSans-Regular", "Helvetica"],
        PublicSansBold: ["PublicSans-Bold", "Helvetica"],
      },
      colors: {
        decorativeGreen: "#73FCC2",
        buttonTextBlack: "#020617",
      },
      boxShadow: {
        bannerShadow:
          "0px 0px 0px 0px rgba(132, 230, 192, 0.10), 0px 44px 97px 0px rgba(132, 230, 192, 0.10), 0px 176px 176px 0px rgba(132, 230, 192, 0.09), 0px 396px 238px 0px rgba(132, 230, 192, 0.05), 0px 704px 282px 0px rgba(132, 230, 192, 0.01), 0px 1100px 308px 0px rgba(132, 230, 192, 0.00);",
      },
    },
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
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
