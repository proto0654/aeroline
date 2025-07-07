/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./assets/**/*.{html,js,hbs,vue}",
    "./*.html",
    "./main.js",
    "./docs/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue": "#008DD2", // Синий цвет из брендбука
        "brand-gray": "#4D4D4D", // Темно-серый цвет из брендбука
        "brand-gray-dark": "#222222",
        "brand-light": "#F4F6F9", // Светло-серый цвет из брендбука
        "brand-white": "#FFFFFF", // Белый цвет из брендбука
        "brand-blue-opacity": "rgba(0, 141, 210, 0.2)",
        "brand-red": "#FF0000",
      },
      fontFamily: {
        calibri: ["Calibri", "sans-serif"],
      },
      fontSize: {
        // Настройки размеров шрифтов из брендбука
        h1: "68px",
        h2: "48px",
        h3: "32px",
        h4: "26px",
        h5: "20px",
        h6: "18px",
        body: "18px",
        "body-secondary": "20px",
        "caps-bold": "20px",
        buttons: "18px",
        "caps-regular": "18px",
        "caption-regular": "24px",
        "caption-menu": "16px",
        "caption-light": "18px",
        "caption-form": "16px",
        "caption-form-light": "14px",
      },
      fontWeight: {
        light: 300,
        regular: 400,
        bold: 700,
      },
      lineHeight: {
        1: "1",
        auto: "auto",
        "1em": "1em",
        1.2: "1.2",
        1.5: "1.5",
      },
      objectPosition: {
        bottom: "bottom",
        center: "center",
        top: "top",
        left: "left",
        right: "right",
        "left-bottom": "left bottom",
        "left-top": "left top",
        "right-bottom": "right bottom",
        "right-top": "right top",
      },
      spacing: {
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "3.75rem",
        16: "4rem",
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
        20: "5rem",
        21: "5.25rem",
        22: "5.5rem",
        23: "5.75rem",
        24: "6rem",
        25: "6.25rem",
        26: "6.5rem",
        27: "6.75rem",
        28: "7rem",
        29: "7.25rem",
        30: "7.5rem",
        31: "7.75rem",
        32: "8rem",
        33: "8.25rem",
        34: "8.5rem",
        35: "8.75rem",
        36: "9rem",
        37: "9.25rem",
        38: "9.5rem",
        39: "9.75rem",
        40: "10rem",
      },
      animation: {
        fade_in: "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
    // Настройка брейкпоинтов для mobile-first подхода
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1921px",
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".animation-delay-0": {
          "animation-delay": "0ms",
        },
        ".animation-delay-100": {
          "animation-delay": "100ms",
        },
        ".animation-delay-200": {
          "animation-delay": "200ms",
        },
        ".animation-delay-300": {
          "animation-delay": "300ms",
        },
        ".animation-delay-400": {
          "animation-delay": "400ms",
        },
        ".animation-delay-500": {
          "animation-delay": "500ms",
        },
        ".animation-delay-600": {
          "animation-delay": "600ms",
        },
        ".animation-delay-700": {
          "animation-delay": "700ms",
        },
        ".animation-delay-800": {
          "animation-delay": "800ms",
        },
        ".animation-delay-900": {
          "animation-delay": "900ms",
        },
        ".animation-delay-1000": {
          "animation-delay": "1000ms",
        },
        ".animation-delay-1500": {
          "animation-delay": "1500ms",
        },
        ".animation-delay-2000": {
          "animation-delay": "2000ms",
        },
        ".animation-delay-2500": {
          "animation-delay": "2500ms",
        },
        ".animation-delay-3000": {
          "animation-delay": "3000ms",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  daisyui: {
    themes: [
      {
        aeroline: {
          primary: "#008DD2",
          "primary-content": "#FFFFFF",
          secondary: "#4D4D4D",
          "secondary-content": "#FFFFFF",
          accent: "#F4F6F9",
          "accent-content": "#4D4D4D",
          neutral: "#4D4D4D",
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",
          "base-200": "#F4F6F9",
          "base-300": "#E5E7EB",
          "base-content": "#4D4D4D",
          info: "#008DD2",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "0.25rem",
          "--animation-btn": "0.2s",
          "--animation-input": "0.2s",
          "--btn-text-case": "none",
          "--btn-focus-scale": "0.98",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
          "--input-bg": "#FFFFFF",
          "--input-border": "#E5E7EB",
          "--input-focus-border": "#008DD2",
          "--input-focus-ring": "2px",
          "--input-focus-ring-color": "rgba(0, 141, 210, 0.2)",
          "--scrollbar-track": "#F4F6F9",
          "--scrollbar-thumb": "#E5E7EB",
          "--scrollbar-thumb-hover": "#D1D5DB",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
    darkTheme: false,
  },
};
