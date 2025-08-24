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
      pink: {
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
      mint: {
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
      royal: {
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
      layout: {
        bg: {
          green: {
            day: "#E1DFAC",
            night: "#00141E",
          },
          red: {
            day: "#E9BDBD",
            night: "#370514",
          },
          blue: {
            day: "#707AF2",
            night: "#120950",
          },
          pink: {
            day: "#E17FD7",
            night: "#320A30",
          },
          current: "var(--current-layout-bg)",
        },
      },
      int: {
        accent: {
          primary: "#1486FF",
          secondary: "#FF94FF",
        },
        highlight: {
          light: "#FFF0F4",
          dark: "#150477",
        },
      },
    },
    extend: {
      backgroundImage: {
        "scan-lines":
          "repeating-linear-gradient(transparent, transparent 3px, black 3px, black 6px)",
      },
      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(-4px)",
            "animation-timing-function": "cubic-bezier(0.7,0,1,1)",
          },
          "50%": {
            transform: "translateY(0px)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        window: {
          "0%, 100%": {
            transform: "translateY(-9px)",
            "animation-timing-function": "cubic-bezier(0.7,0,1,1)",
          },
          "50%": {
            transform: "translateY(0px)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        bgmoveX: {
          "0%": { transform: "translate(0)" },
          "100%": { transform: "translate(-2980px)" },
        },
        bgmoveXY: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-1920px, 1080px)" },
        },
        blink: {
          "0%": { "border-right-width": "8px" },
          "50%": { "border-right-width": "0px" },
        },
        fadeinout1: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.1" },
        },
        fadeinout2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.1" },
        },
        donationAlert: {
          "0%, 100%": {
            transform: "scale(1)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "scale(0.95)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        scrollX: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(var(--max-scroll-x), 0)" },
        },
        scrollY: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(0, var(--max-scroll-y))" },
        },
        gridIntermission: {
          "0%": { maskPosition: "0px 0px" },
          "100%": { maskPosition: "252px 126px" },
        },
        gridLayout: {
          "0%": { maskPosition: "252px 126px" },
          "100%": { maskPosition: "0px 0px" },
        },
        bgDonationGoals25: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "1728px 0" }, // 576 * 3
        },
      },
      transitionTimingFunction: {
        "in-out-back": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
        "in-out-sine": "cubic-bezier(0.37, 0, 0.63, 1)",
      },
      dropShadow: {
        "layout-text": "var(--drop-shadow-layout-text)",
        "layout-dark": "3px 3px 0 #150477",
      },
      animation: {
        clouds: "bgmoveX linear infinite",
        stars: "bgmoveXY linear infinite",
        blink: "blink step-end infinite 1.25s",
        fadeinout1: "fadeinout1 ease-in-out 2s",
        fadeinout2: "fadeinout2 ease-in-out 2s",
        donationAlert: "donationAlert infinite 1920ms",
        float: "float infinite ease-in 3s",
        window: "window infinite ease-in 3s",
        scrollX: "scrollX 10s cubic-bezier(0.37, 0, 0.63, 1) infinite",
        scrollY: "scrollY 30s ease-in-out infinite",
        gridIntermission: "gridIntermission 20s linear infinite",
        gridLayout: "gridLayout 60s linear infinite",
        bgDonationGoals25: "bgDonationGoals25 10s linear infinite",
      },
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
        ubuntu: [
          "Ubuntu",
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
        ],
        pixel: [
          "DepixelHalbfett",
          "Ubuntu",
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
        ],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const colors = ["neutral", "pink", "royal", "mint"];
      const intensities = [100, 200, 300, 400, 500, 600, 700, 800, 900];

      const accentUtilities = Object.fromEntries(
        colors.map((color) => {
          const entries = [];

          for (const intensity of intensities) {
            entries.push([
              `--accent-${intensity}`,
              theme(`colors.${color}.${intensity}`),
            ]);
            entries.push([
              `--accent-${intensity}-rgb`,
              hexToRgb(theme(`colors.${color}.${intensity}`)),
            ]);
          }

          return [`.woc-accent-${color}`, Object.fromEntries(entries)];
        })
      );

      addUtilities(accentUtilities);
    }),
    plugin(function ({ addUtilities, theme }) {
      const newUtilities = {
        ".bg-repeating-linear-gradient": {
          backgroundImage: `repeating-linear-gradient(-45deg, ${theme("colors.royal.500")} 0 6px, transparent 6px 12px)`,
        },
        ".bg-donation-goals-25": {
          backgroundImage: `repeating-linear-gradient(to right in oklch, #f532c0 0%, #ae41f0 15%, #1486ff 30%, #61d7e7 50%, #1486ff 70%, #ae41f0 85%, #f532c0 100%)`,
        },
        ".bg-int-accent-gradient": {
          background: "linear-gradient(to top in oklch, #FF94FF, #1486FF)",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
  mode: "jit",
};
