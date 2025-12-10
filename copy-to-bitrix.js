import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Рекурсивное удаление директории
 */
function removeDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }
  
  try {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        removeDirectory(itemPath);
      } else {
        fs.unlinkSync(itemPath);
      }
    });
    
    fs.rmdirSync(dirPath);
  } catch (error) {
    console.error(`⚠️  Ошибка при удалении ${dirPath}:`, error.message);
  }
}

/**
 * Очистка папок с хешированными ассетами перед копированием
 */
function cleanAssetsBeforeCopy(assetsDir) {
  if (!fs.existsSync(assetsDir)) {
    return;
  }
  
  console.log('🧹 Очистка старых ассетов...');
  
  // Очищаем только папки с хешированными файлами
  const dirsToClean = ['js', 'css', '.vite'];
  
  dirsToClean.forEach(dir => {
    const dirPath = path.join(assetsDir, dir);
    if (fs.existsSync(dirPath)) {
      removeDirectory(dirPath);
      console.log(`  ✅ Удалена папка: ${dir}/`);
    }
  });
  
  console.log('');
}

/**
 * Копирование ассетов из docs/ в www/local/assets/
 */
function copyDirectory(sourceDir, destDir) {
  try {
    if (!fs.existsSync(sourceDir)) {
      console.error(`❌ Исходная директория не существует: ${sourceDir}`);
      return false;
    }
    
    // Создаем директорию назначения, если она не существует
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
      console.log(`✅ Создана директория: ${destDir}`);
    }
    
    // Получаем список файлов и поддиректорий
    const items = fs.readdirSync(sourceDir);
    
    // Копируем каждый элемент
    items.forEach(item => {
      const sourcePath = path.join(sourceDir, item);
      const destPath = path.join(destDir, item);
      
      const stat = fs.statSync(sourcePath);
      
      if (stat.isDirectory()) {
        // Рекурсивно копируем поддиректорию
        copyDirectory(sourcePath, destPath);
      } else {
        // Копируем файл
        fs.copyFileSync(sourcePath, destPath);
        console.log(`📄 ${item}`);
      }
    });
    
    return true;
  } catch (error) {
    console.error(`❌ Ошибка при копировании ${sourceDir}:`, error.message);
    return false;
  }
}

console.log('🚀 Копирование ассетов из docs/ в www/local/assets/...\n');

const projectRoot = path.resolve(__dirname, '..');
const docsAssets = path.join(__dirname, 'docs', 'assets');
const docsVite = path.join(__dirname, 'docs', '.vite');
const wwwAssets = path.join(projectRoot, 'www', 'local', 'assets');
const wwwVite = path.join(wwwAssets, '.vite');

// Очищаем старые хешированные файлы перед копированием
cleanAssetsBeforeCopy(wwwAssets);

// Копируем ассеты
console.log('📦 Копирование assets/...');
if (copyDirectory(docsAssets, wwwAssets)) {
  console.log('✅ Ассеты скопированы\n');
} else {
  console.log('❌ Ошибка при копировании ассетов\n');
  process.exit(1);
}

// Копируем манифест Vite
console.log('📦 Копирование .vite/manifest.json...');
if (fs.existsSync(docsVite)) {
  if (!fs.existsSync(wwwVite)) {
    fs.mkdirSync(wwwVite, { recursive: true });
  }
  
  const manifestSource = path.join(docsVite, 'manifest.json');
  const manifestDest = path.join(wwwVite, 'manifest.json');
  
  if (fs.existsSync(manifestSource)) {
    fs.copyFileSync(manifestSource, manifestDest);
    console.log('✅ Манифест скопирован\n');
  } else {
    console.log('⚠️  Манифест не найден в docs/.vite/\n');
  }
} else {
  console.log('⚠️  Папка docs/.vite/ не найдена\n');
}

console.log('✨ Копирование завершено!');
console.log(`📂 Ассеты находятся в: ${wwwAssets}`);
console.log(`📂 Манифест находится в: ${wwwVite}`);

