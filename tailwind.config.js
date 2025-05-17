/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.{html,js,hbs}",
    "./*.html",
    "./main.js",
    "./docs/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#008DD2',    // Синий цвет из брендбука
        'brand-gray': '#4D4D4D',    // Темно-серый цвет из брендбука
        'brand-light': '#F4F6F9',   // Светло-серый цвет из брендбука
        'brand-white': '#FFFFFF',   // Белый цвет из брендбука
        
      },
      fontFamily: {
        'calibri': ['Calibri', 'sans-serif'],
      },
      fontSize: {
        // Настройки размеров шрифтов из брендбука
        h1: '68px',
        h2: '48px',
        h3: '32px',
        h4: '26px',
        h5: '20px',
        h6: '18px',
        body: '24px',
        'body-secondary': '20px',
        'caps-bold': '20px',
        'buttons': '20px',
        'caps-regular': '18px',
        'caption-regular': '24px',
        'caption-light': '18px',
        'caption-form': '16px',
        'caption-form-light': '14px',
      },
      fontWeight: {
        light: 300,
        regular: 400,
        bold: 700,
      },
      lineHeight: {
        '1': '1',
        'auto': 'auto',
        '1em': '1em',
        '1.2': '1.2',
        '1.5': '1.5',
      },
      objectPosition: {
        'bottom': 'bottom',
        'center': 'center',
        'top': 'top',
        'left': 'left',
        'right': 'right',
        'left-bottom': 'left bottom',
        'left-top': 'left top',
        'right-bottom': 'right bottom',
        'right-top': 'right top',
      },
    },
    // Настройка брейкпоинтов для mobile-first подхода
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1921px',
    },
  },
  plugins: [],
}