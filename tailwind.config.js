/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "letter-roll": "letter-roll 750ms cubic-bezier(.37,.72,.59,1.4)",
      },
      keyframes: {
        "letter-roll": {
          "0%": {
            transform: "rotateX(0deg) rotateX(-5deg) rotateY(3deg)",
          },
          "100%": {
            transform: "rotateX(-360deg) rotateX(-5deg) rotateY(3deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
