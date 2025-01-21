/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dynapuff: ["DynaPuff", "cursive"], // For 'DynaPuff'
        firacode: ["Fira Code", "monospace"], // For 'Fira Code'
        ubuntumono: ["Ubuntu Sans Mono", "monospace"], // For 'Ubuntu Sans Mono'
      },
      animation: {
        open: "open 4s infinite alternate",
      },
      keyframes: {
        open: {
          "0%": { transform: "perspective(1900px) rotateX(-88.5deg)" },
          "100%": { transform: "perspective(1000px) rotateX(0deg)" },
        },
      },
      boxShadow: {
        "inset-sm": "inset 0 -2px 8px 0 #6c7074",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      //page2 card
      keyframes: {
        cursor: {
          "50%": { borderRightColor: "transparent" },
        },
      },
      animation: {
        cursor: "cursor 0.5s step-end infinite alternate",
      },
    },
  },
  plugins: [require("daisyui")],
};
