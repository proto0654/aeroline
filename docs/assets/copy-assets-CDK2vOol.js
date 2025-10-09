import fs from 'fs';
import path from 'path';

/**
 * Функция для копирования файла из одного места в другое
 * @param {string} source - Путь к исходному файлу
 * @param {string} destination - Путь к месту назначения
 */
function copyFile(source, destination) {
  try {
    // Проверяем, существует ли исходный файл
    if (!fs.existsSync(source)) {
      console.error(`Исходный файл не существует: ${source}`);
      return;
    }
    
    // Создаем директорию назначения, если она не существует
    const destDir = path.dirname(destination);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Копируем файл
    fs.copyFileSync(source, destination);
    console.log(`Файл скопирован: ${source} -> ${destination}`);
  } catch (error) {
    console.error(`Ошибка при копировании файла ${source}:`, error);
  }
}

/**
 * Функция для копирования директории со всеми файлами и поддиректориями
 * @param {string} sourceDir - Исходная директория
 * @param {string} destDir - Директория назначения
 */
function copyDirectory(sourceDir, destDir) {
  try {
    // Проверяем, существует ли исходная директория
    if (!fs.existsSync(sourceDir)) {
      console.error(`Исходная директория не существует: ${sourceDir}`);
      return;
    }
    
    // Создаем директорию назначения, если она не существует
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Получаем список файлов и поддиректорий
    const items = fs.readdirSync(sourceDir);
    
    // Копируем каждый элемент
    items.forEach(item => {
      const sourcePath = path.join(sourceDir, item);
      const destPath = path.join(destDir, item);
      
      // Проверяем, является ли элемент директорией
      const isDirectory = fs.statSync(sourcePath).isDirectory();
      
      if (isDirectory) {
        // Рекурсивно копируем поддиректорию
        copyDirectory(sourcePath, destPath);
      } else {
        // Копируем файл
        copyFile(sourcePath, destPath);
      }
    });
    
    console.log(`Директория скопирована: ${sourceDir} -> ${destDir}`);
  } catch (error) {
    console.error(`Ошибка при копировании директории ${sourceDir}:`, error);
  }
}

// Копируем собранные JS-файлы
console.log('Копирование собранных JS-файлов...');
copyFile('assets/js/bundle.js', 'docs/assets/js/bundle.js');
copyFile('assets/js/bundle-legacy.js', 'docs/assets/js/bundle-legacy.js');

// Копируем CSS-файлы, если они существуют
console.log('Копирование CSS-файлов...');
if (fs.existsSync('assets/css')) {
  copyDirectory('assets/css', 'docs/assets/css');
}

// Копируем другие ресурсы, если необходимо
console.log('Копирование других ресурсов...');
if (fs.existsSync('assets/images')) {
  copyDirectory('assets/images', 'docs/assets/images');
}

console.log('Копирование завершено!'); 