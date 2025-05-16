const fs = require('fs');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

console.log('Начинаем процесс обработки Tailwind CSS...');

// Функция для обработки CSS с Tailwind
async function processTailwindCSS() {
  try {
    // Чтение исходного CSS файла
    const css = fs.readFileSync('./assets/css/main.css', 'utf-8');
    
    // Создание PostCSS процессора с нужными плагинами
    const result = await postcss([
      tailwindcss('./tailwind.config.js'),
      autoprefixer,
      cssnano({ preset: 'default' }) // Минификация CSS
    ]).process(css, { 
      from: './assets/css/main.css', 
      to: './docs/assets/css/main.css'
    });
    
    // Создаем директорию, если ее нет
    if (!fs.existsSync('./docs/assets/css')) {
      fs.mkdirSync('./docs/assets/css', { recursive: true });
    }
    
    // Запись обработанного CSS в выходной файл
    fs.writeFileSync('./docs/assets/css/main.css', result.css);
    
    console.log('Tailwind CSS успешно обработан и сохранен в ./docs/assets/css/main.css');
  } catch (error) {
    console.error('Ошибка при обработке Tailwind CSS:', error);
  }
}

// Запуск обработки CSS
processTailwindCSS(); 