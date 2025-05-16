import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import fs from 'fs';
import matter from 'front-matter';
import { copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// Функция для определения базового пути в зависимости от окружения
function getBase() {
  // Если сборка для GitHub Pages (или другого продакшена), используем путь репозитория
  if (process.env.NODE_ENV === 'production') {
    return '/aeroline/';
  }
  // Для локальной разработки используем относительный путь
  return './';
}

// Функция для чтения front matter из HTML-файлов
function getPageData() {
  const pages = {};
  
  // Список файлов для обработки
  const files = ['index.html', 'vacancies.html', 'contacts.html', 'helper.html', 'payments.html', 'order-tracking.html', 'news.html', 'services.html'];
  
  files.forEach(file => {
    try {
      const source = fs.readFileSync(file, 'utf-8');
      const { attributes, body } = matter(source);
      pages[file] = { ...attributes };
    } catch (error) {
      console.error(`Error reading front matter from ${file}:`, error);
    }
  });
  
  return pages;
}

// Загрузка данных о вакансиях из JSON
function getVacanciesData() {
  try {
    const vacanciesData = fs.readFileSync('./assets/data/vacancies.json', 'utf-8');
    return JSON.parse(vacanciesData);
  } catch (error) {
    console.error('Error reading vacancies data:', error);
    return [];
  }
}

// Загрузка данных о контактах из JSON
function getContactsData() {
  try {
    const contactsData = fs.readFileSync('./assets/data/contacts.json', 'utf-8');
    const data = JSON.parse(contactsData);
    
    // Если есть офисы, определяем параметры пагинации
    if (data.offices && data.offices.length > 0) {
      const itemsPerPage = data.itemsPerPage || 9;
      const totalPages = Math.ceil(data.offices.length / itemsPerPage);
      
      // Обновляем общее количество страниц
      data.pagination = {
        currentPage: 1,
        totalPages: totalPages
      };
      
      // Выбираем случайный офис для отображения на карте
      const randomIndex = Math.floor(Math.random() * Math.min(9, data.offices.length));
      data.selectedOffice = data.offices[randomIndex];
      data.selectedOfficeIndex = randomIndex;
      
      // Определяем на какой странице пагинации находится выбранный офис
      // и устанавливаем эту страницу как текущую
      const officePage = Math.floor(randomIndex / itemsPerPage) + 1;
      data.pagination.currentPage = officePage;
    }
    
    return data;
  } catch (error) {
    console.error('Error reading contacts data:', error);
    return {
      pageDescription: "",
      offices: [],
      pagination: { currentPage: 1, totalPages: 1 }
    };
  }
}

// Функция для копирования директории
function copyDir(src, dest) {
  try {
    if (!fs.existsSync(dest)) {
      mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = resolve(src, entry.name);
      const destPath = resolve(dest, entry.name);
      
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        const destDir = dirname(destPath);
        if (!fs.existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true });
        }
        copyFileSync(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error(`Error copying directory from ${src} to ${dest}:`, error);
  }
}

export default defineConfig({
  base: getBase(),
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'assets/partials'),
      context: (pagePath) => {
        const pageData = getPageData();
        const filename = pagePath.split('/').pop();
        
        let contextData = {
          // Глобальный контекст для всех шаблонов
          siteName: 'Aeroline',
          // Добавляем базовый путь для ссылок
          basePath: getBase(),
          // Добавляем контекст из front matter
          ...pageData[filename]
        };

        // Если это страница вакансий, добавляем данные о вакансиях
        if (filename === 'vacancies.html') {
          contextData.vacancies = getVacanciesData();
          
          // Группируем вакансии по городам для фильтрации
          const cities = new Set();
          contextData.vacancies.forEach(vacancy => {
            const city = vacancy.location.split(',')[0].trim();
            cities.add(city);
          });
          contextData.cities = Array.from(cities);
        }
        
        // Если это страница контактов, добавляем данные о контактах
        if (filename === 'contacts.html') {
          const contactsData = getContactsData();
          
          contextData = {
            ...contextData,
            ...contactsData
          };
          
          // Группируем офисы по городам для фильтрации
          const cities = new Set();
          if (contactsData.offices && contactsData.offices.length > 0) {
            contactsData.offices.forEach(office => {
              cities.add(office.city);
            });
          }
          contextData.cities = Array.from(cities);
        }
        
        return contextData;
      },
      helpers: {
        eq: (a, b) => a === b,
        contains: (str, substr) => str.includes(substr),
        // Добавляем хелпер для генерации номеров страниц пагинации
        pageNumbers: (currentPage, totalPages) => {
          const pages = [];
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
          return pages;
        }
      }
    }),
    {
      name: 'copy-assets',
      closeBundle() {
        // Копируем директорию assets в dist
        copyDir('assets', 'dist/assets');
      }
    },
    {
      name: 'copy-nojekyll',
      closeBundle() {
        // Копируем файл .nojekyll в dist для GitHub Pages
        try {
          if (fs.existsSync('.nojekyll')) {
            fs.copyFileSync('.nojekyll', 'dist/.nojekyll');
            console.log('Successfully copied .nojekyll to dist folder');
          }
        } catch (error) {
          console.error('Error copying .nojekyll file:', error);
        }
      }
    }
  ],
  server: {
    open: true,
    port: 3000,
    host: true,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Настраиваем минификацию, чтобы сохранить имена функций
    minify: 'terser',
    terserOptions: {
      compress: {
        // Отключаем агрессивную минификацию некоторых конструкций
        drop_console: false,
        drop_debugger: false,
        pure_funcs: []
      },
      mangle: {
        // Сохраняем важные имена функций
        keep_fnames: /^init/
      },
      format: {
        // Оставляем комментарии
        comments: false
      }
    },
    // Настройки для правильной обработки скриптов в режиме разработки и production
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        vacancies: resolve(__dirname, 'vacancies.html'),
        contacts: resolve(__dirname, 'contacts.html'),
        helper: resolve(__dirname, 'helper.html'),
        payments: resolve(__dirname, 'payments.html'),
        orderTracking: resolve(__dirname, 'order-tracking.html'),
        news: resolve(__dirname, 'news.html'),
        services: resolve(__dirname, 'services.html'),
      },
      output: {
        // Именование файлов без хешей для простого открытия через file://
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          // Сохраняем оригинальную структуру для картинок и других ресурсов
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/[name].css';
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return 'assets/img/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
        // Отключаем inlineDynamicImports, чтобы избежать ошибки с множественными input
        inlineDynamicImports: false
      }
    },
    // Отключаем инлайн для улучшения совместимости
    assetsInlineLimit: 0,
    assetsDir: 'assets',
    // Отключаем source maps
    sourcemap: false
  },
}); 