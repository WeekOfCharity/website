const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

const hexToRgb = (hex) =>
  hex
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16))
    .join(", ");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      neutral: colors.neutral,
      uiAccent: "#4186bd",
      accent: {
        100: "var(--accent-100)",
        200: "var(--accent-200)",
        300: "var(--accent-300)",
        400: "var(--accent-400)",
        500: "var(--accent-500)",
        600: "var(--accent-600)",
        700: "var(--accent-700)",
        800: "var(--accent-800)",
        900: "var(--accent-900)",
      },
      persian: {
        100: "#FEE4E8",
        200: "#FECAD6",
        300: "#FCAFC9",
        400: "#F99BC4",
        500: "#F67ABC",
        600: "#D359A6",
        700: "#B13D92",
        800: "#8E267D",
        900: "#76176F",
      },
      aqua: {
        100: "#E7FDEC",
        200: "#CFFCDE",
        300: "#B4F7D2",
        400: "#9FF0CB",
        500: "#7FE6C1",
        600: "#5CC5AA",
        700: "#40A595",
        800: "#28857F",
        900: "#186B6E",
      },
      arctic: {
        100: "#E8FEFE",
        200: "#D2FAFE",
        300: "#BBF2FD",
        400: "#AAE9FB",
        500: "#8EDAFA",
        600: "#67AED7",
        700: "#4785B3",
        800: "#2D5F90",
        900: "#1B4377",
      },
      mustard: {
        100: "#FFFDE2",
        200: "#FFFBC5",
        300: "#FFF9A9",
        400: "#FFF693",
        500: "#FFF370",
        600: "#DBCE51",
        700: "#B7AA38",
        800: "#938723",
        900: "#7A6E15",
      },
      lavender: {
        100: "#F9E5FE",
        200: "#F1CBFD",
        300: "#E5B0FB",
        400: "#D69BF7",
        500: "#C17AF2",
        600: "#9859D0",
        700: "#733DAE",
        800: "#51268C",
        900: "#381774",
      },
      pink23: {
        100: "#FEE4E8",
        200: "#FECAD6",
        300: "#FCAFC9",
        400: "#F99BC4",
        500: "#F67ABC",
        600: "#D359A6",
        700: "#B13D92",
        800: "#8E267D",
        900: "#76176F",
      },
      green23: {
        100: "#E7FDEC",
        200: "#CFFCDE",
        300: "#B4F7D2",
        400: "#9FF0CB",
        500: "#7FE6C1",
        600: "#5CC5AA",
        700: "#40A595",
        800: "#28857F",
        900: "#186B6E",
      },
      blue23: {
        100: "#E7F3FD",
        200: "#CFE4FC",
        300: "#B4CCF7",
        400: "#9FB5F0",
        500: "#7F91E6",
        600: "#5C63C5",
        700: "#4240A5",
        800: "#332885",
        900: "#2A186E",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          '"Source Sans 3"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        fat: ["Lilita One", "sans-serif"],
        handwriting: ["Caveat", "sans-serif"],
        round: ["Quicksand", "sans-serif"],
        round2: ["PilcrowRounded", "sans-serif"],
        pally: ["Pally", "sans-serif"],
        brush: ["Explorer", "sans-serif"],
        serif: [
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const colors = [
        "persian",
        "aqua",
        "arctic",
        "mustard",
        "lavender",
        "neutral",
        "pink23",
        "blue23",
        "green23",
      ];
      const intensities = [100, 200, 300, 400, 500, 600, 700, 800, 900];

      const accentUtilities = Object.fromEntries(
        colors.map((color) => {
          return [
            `.woc-accent-${color}`,
            Object.fromEntries(
              intensities.flatMap((intensity) => {
                return [
                  [
                    `--accent-${intensity}`,
                    theme(`colors.${color}.${intensity}`),
                  ],
                  [
                    `--accent-${intensity}-rgb`,
                    hexToRgb(theme(`colors.${color}.${intensity}`)),
                  ],
                ];
              })
            ),
          ];
        })
      );

      addUtilities(accentUtilities);
    }),
    plugin(function ({ addUtilities, theme }) {
      const newUtilities = {
        ".bg-repeating-linear-gradient": {
          backgroundImage: `repeating-linear-gradient(-45deg, ${theme("colors.blue23.500")} 0 6px, transparent 6px 12px)`,
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
  mode: "jit",
};
