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
        "letter-roll": "letter-roll 750ms  cubic-bezier(.37,.72,.59,1.4)",
      },
      keyframes: {
        "letter-roll": {
          "0%": {
            transform: "rotateX(-5deg) rotateY(3deg)",
          },
          "25%": {
            rotate: "z var(--rotate-z-25)",
          },
          "50%": {
            rotate: "y var(--rotate-y-50)",
          },
          "75%": {
            rotate: "z var(--rotate-z-75)",
          },
          "100%": {
            transform: "rotateX(-365deg) rotateY(3deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
