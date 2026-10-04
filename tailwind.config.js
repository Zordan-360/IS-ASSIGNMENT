/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./hooks/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#07080A",
          soft: "#0C0E12",
          line: "#16191F",
        },
        bone: "#F2F1ED",
        muted: "#868C97",
        fizz: {
          DEFAULT: "#CBFF4D",
          dim: "#8FB32C",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        brand: "0.34em",
        mega: "0.22em",
        wide2: "0.18em",
      },
      fontSize: {
        "10xl": ["clamp(2.6rem, 8.6vw, 8.5rem)", { lineHeight: "0.94", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        stage: "1440px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      screens: {
        xs: "420px",
        // Height-aware variants: the hero must fit in one screen on short
        // laptops, so vertical rhythm steps down with viewport height.
        "h-sm": { raw: "(min-height: 700px)" },
        "h-md": { raw: "(min-height: 820px)" },
        "h-lg": { raw: "(min-height: 940px)" },
      },
    },
  },
  plugins: [],
};
