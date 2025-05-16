const { execSync } = require('child_process');
const fs = require('fs');

console.log('Запуск сборки CSS с помощью Tailwind CLI...');

try {
  // Убедимся, что директория существует
  if (!fs.existsSync('./docs/assets/css')) {
    fs.mkdirSync('./docs/assets/css', { recursive: true });
  }
  
  // Запускаем tailwindcss CLI
  execSync('npx tailwindcss -i ./assets/css/main.css -o ./docs/assets/css/main.css --minify', { stdio: 'inherit' });
  
  console.log('CSS успешно собран и минифицирован в ./docs/assets/css/main.css');
} catch (error) {
  console.error('Ошибка при сборке CSS:', error);
} 