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
        "letter-look-up": "letter-look-up 3000ms",
      },
      keyframes: {
        "letter-roll": {
          "0%": {
            transform: "rotateX(-5deg) rotateY(3deg)",
          },
          "25%": {
            rotate: "z var(--roll-z-25)",
          },
          "50%": {
            rotate: "y var(--roll-y-50)",
          },
          "75%": {
            rotate: "z var(--roll-z-75)",
          },
          "100%": {
            transform: "rotateX(-365deg) rotateY(3deg)",
          },
        },
        "letter-look-up": {
          "0%": {
            transform: "rotateX(-5deg) rotateY(3deg)",
          },
          "20%": {
            transform: "rotateX(-5deg) rotateY(3deg)",
          },
          "60%": {
            transform:
              "rotateX(var(--look-up-x)) rotateY(var(--look-up-y)) rotateZ(var(--look-up-z))",
          },
          "80%": {
            transform:
              "rotateX(var(--look-up-x)) rotateY(var(--look-up-y)) rotateZ(var(--look-up-z))",
          },
          "100%": {
            transform: "rotateX(-5deg) rotateY(3deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
