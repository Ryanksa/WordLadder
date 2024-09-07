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
        "letter-drop": "letter-drop 900ms"
      },
      keyframes: {
        "letter-roll": {
          "0%": {
            transform: "rotateX(-5deg)",
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
            transform: "rotateX(-365deg)",
          },
        },
        "letter-look-up": {
          "0%": {
            transform: "rotateX(-5deg)",
          },
          "20%": {
            transform: "rotateX(-5deg)",
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
            transform: "rotateX(-5deg)",
          },
        },
        "letter-drop": {
          "0%": {
            zIndex: -1,
            transform: "rotateX(-5deg)",
            translate: "var(--drop-x-0) -9rem -15rem",
          },
          "25%": {
            rotate: "z var(--drop-z-25)",
          },
          "30%": {
            translate: "var(--drop-x-30) 0 -12rem",
          },
          "45%": {
            translate: "var(--drop-x-45) -3rem -9rem",
          },
          "50%": {
            rotate: "y var(--drop-y-50)",
          },
          "60%": {
            translate: "var(--drop-x-60) 0 -6rem",
          },
          "75%": {
            translate: "var(--drop-x-75) -1.5rem -3rem",
            rotate: "z var(--drop-z-75)",
          },
          "100%": {
            zIndex: -1,
            transform: "rotateX(var(--drop-rotation))"
          }
        }
      },
    },
  },
  plugins: [],
};
