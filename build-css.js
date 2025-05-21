import { execSync } from 'child_process';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

console.log('Запуск сборки CSS с помощью Tailwind CLI...');

try {
  // Убедимся, что директория существует
  if (!fs.existsSync('./docs/assets/css')) {
    fs.mkdirSync('./docs/assets/css', { recursive: true });
  }
  
  // Удаляем старые хешированные CSS-файлы
  cleanOldCssFiles('./docs/assets/css');
  
  // Временный файл для сборки
  const tempCssPath = './docs/assets/css/main.temp.css';
  
  // Запускаем tailwindcss CLI для создания временного файла
  execSync(`npx tailwindcss -i ./assets/css/main.css -o ${tempCssPath} --minify`, { stdio: 'inherit' });
  
  // Читаем содержимое сгенерированного CSS
  const cssContent = fs.readFileSync(tempCssPath);
  
  // Генерируем хеш на основе содержимого
  const hash = crypto.createHash('md5').update(cssContent).digest('hex').substring(0, 8);
  
  // Создаем имя файла с хешем
  const hashedFileName = `main-${hash}.css`;
  const finalPath = path.join('./docs/assets/css', hashedFileName);
  
  // Перемещаем файл с новым именем
  fs.renameSync(tempCssPath, finalPath);
  
  // Создаем файл с информацией о последнем хеше для использования в HTML
  fs.writeFileSync('./docs/assets/css/css-hash.json', JSON.stringify({ 
    cssFile: hashedFileName,
    timestamp: new Date().toISOString()
  }));
  
  console.log(`CSS успешно собран и минифицирован в ${finalPath}`);
  
  // Проверяем наличие HTML-файлов перед обновлением ссылок
  const htmlDir = './docs';
  if (fs.existsSync(htmlDir)) {
    const htmlFiles = fs.readdirSync(htmlDir)
      .filter(file => file.endsWith('.html'));
    
    if (htmlFiles.length > 0) {
      console.log(`Найдено ${htmlFiles.length} HTML-файлов для обновления`);
      updateHtmlFiles(hashedFileName);
    } else {
      console.warn('HTML-файлы не найдены в директории docs. Ссылки на CSS не обновлены.');
    }
  } else {
    console.warn('Директория docs не существует. Ссылки на CSS не обновлены.');
  }
  
} catch (error) {
  console.error('Ошибка при сборке CSS:', error);
}

// Функция для удаления старых CSS-файлов
function cleanOldCssFiles(directory) {
  try {
    if (!fs.existsSync(directory)) {
      return;
    }
    
    const files = fs.readdirSync(directory);
    let deletedCount = 0;
    
    // Ищем и удаляем все хешированные CSS-файлы
    files.forEach(file => {
      if (file.match(/^main-[a-f0-9]+\.css$/)) {
        fs.unlinkSync(path.join(directory, file));
        deletedCount++;
      }
    });
    
    if (deletedCount > 0) {
      console.log(`Удалено ${deletedCount} старых CSS-файлов`);
    }
  } catch (error) {
    console.error('Ошибка при удалении старых CSS-файлов:', error);
  }
}

// Функция для обновления ссылок на CSS в HTML-файлах
function updateHtmlFiles(hashedFileName) {
  const htmlDir = './docs';
  
  // Получаем список всех HTML-файлов в директории сборки
  const htmlFiles = fs.readdirSync(htmlDir)
    .filter(file => file.endsWith('.html'));
  
  console.log('Обновление ссылок на CSS в HTML-файлах...');
  
  // Обновляем каждый HTML-файл
  htmlFiles.forEach(file => {
    const filePath = path.join(htmlDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Заменяем ссылки на CSS-файл
    const updatedContent = content.replace(
      /<link[^>]*href=['"](?:\.\/)?assets\/css\/[^"']+['"][^>]*>/g,
      `<link rel="stylesheet" href="./assets/css/${hashedFileName}">`
    );
    
    // Записываем обновленный HTML-файл
    fs.writeFileSync(filePath, updatedContent);
  });
  
  console.log(`Ссылки на CSS обновлены в ${htmlFiles.length} HTML-файлах`);
} 