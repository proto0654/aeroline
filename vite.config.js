import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import fs from 'fs';
import matter from 'front-matter';
import { copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

// Функция для определения базового пути в зависимости от окружения
function getBase() {
  // Всегда используем относительный путь для корректной работы
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

// Загрузка данных о слайдере из JSON
function getSlidersData() {
  try {
    const slidersData = fs.readFileSync('./assets/data/sliders.json', 'utf-8');
    return JSON.parse(slidersData);
  } catch (error) {
    console.error('Error reading sliders data:', error);
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

// Загрузка данных о новостях из JSON
function getNewsData() {
  try {
    const newsData = fs.readFileSync('./assets/data/news.json', 'utf-8');
    const data = JSON.parse(newsData);
    
    // Если есть новости, определяем параметры пагинации
    if (data.news && data.news.length > 0) {
      const itemsPerPage = data.itemsPerPage || 5;
      const totalPages = Math.ceil(data.news.length / itemsPerPage);
      
      // Обновляем общее количество страниц
      data.pagination = {
        currentPage: 1,
        totalPages: totalPages
      };
      
      // Ограничиваем количество новостей на странице
      data.currentPageNews = data.news.slice(0, itemsPerPage);
    }
    
    return data;
  } catch (error) {
    console.error('Error reading news data:', error);
    return {
      pageDescription: "Актуальные новости и события компании Aeroline.",
      news: [],
      pagination: { currentPage: 1, totalPages: 1 }
    };
  }
}

// Загрузка данных офиса по умолчанию из JSON
function getDefaultOfficeData() {
  try {
    const defaultOfficeData = fs.readFileSync('./assets/data/default-office.json', 'utf-8');
    return JSON.parse(defaultOfficeData);
  } catch (error) {
    console.error('Error reading default office data:', error);
    return {
      city: "Красноярск",
      address: "ул. Авиаторов, 50",
      type: "Центральный офис",
      phone: "+7 (391) 555-12-34",
      email: "info@aeroline.ru"
    };
  }
}

// Загрузка данных о FAQ для страницы платежей
function getPaymentsFaqData() {
  try {
    const faqData = fs.readFileSync('./assets/data/faq-payments.json', 'utf-8');
    return JSON.parse(faqData);
  } catch (error) {
    console.error('Error reading payments FAQ data:', error);
    return [];
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
    // Добавляем плагин для правильной обработки tailwind при сборке
    {
      name: 'process-tailwind-css',
      enforce: 'pre',
      apply: 'build',
      transform(src, id) {
        if (id.endsWith('main.css') && src.includes('@tailwind')) {
          console.log('Обработка Tailwind CSS при сборке...');
          return;  // Возвращаем undefined, чтобы продолжить стандартную обработку
        }
      }
    },
    handlebars({
      partialDirectory: resolve(__dirname, 'assets/partials'),
      // Регистрируем дополнительные хелперы
      helpers: {
        // Хелпер lt (less than) для сравнения чисел
        lt: (a, b) => a < b,
        // Хелпер eq (equals) для сравнения значений
        eq: (a, b) => a === b,
        contains: (str, substr) => str.includes(substr),
        // Хелпер для условий с is_dev
        if_eq: function(a, b, opts) {
          return a === b ? opts.fn(this) : opts.inverse(this);
        },
        // Добавляем хелпер для генерации номеров страниц пагинации
        pageNumbers: (currentPage, totalPages) => {
          const pages = [];
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
          return pages;
        }
      },
      context: (pagePath) => {
        const pageData = getPageData();
        const filename = pagePath.split('/').pop();
        
        let contextData = {
          // Глобальный контекст для всех шаблонов
          siteName: 'Aeroline',
          // Добавляем базовый путь для ссылок
          basePath: getBase(),
          // Определяем режим работы
          isDev: process.env.NODE_ENV !== 'production', // true в режиме разработки, false в режиме сборки
          // Добавляем контекст из front matter
          ...pageData[filename]
        };

        // Если это главная страница, добавляем данные для слайдера
        if (filename === 'index.html') {
          contextData.sliders = getSlidersData();
          // Добавляем данные новостей для главной страницы
          contextData.newsData = getNewsData();
          // Добавляем данные офиса по умолчанию для карты на главной странице
          contextData.defaultOffice = getDefaultOfficeData();
        }

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
          
          // Добавляем данные офиса по умолчанию для карты на странице контактов
          contextData.defaultOffice = getDefaultOfficeData();
          
          // Группируем офисы по городам для фильтрации
          const cities = new Set();
          if (contactsData.offices && contactsData.offices.length > 0) {
            contactsData.offices.forEach(office => {
              cities.add(office.city);
            });
          }
          contextData.cities = Array.from(cities);
        }
        
        // Если это страница новостей, добавляем данные о новостях
        if (filename === 'news.html') {
          const newsData = getNewsData();
          
          contextData = {
            ...contextData,
            newsData: newsData
          };
        }
        
        // Если это страница платежей, добавляем данные о FAQ
        if (filename === 'payments.html') {
          contextData.paymentsFaq = getPaymentsFaqData();
        }
        
        return contextData;
      }
    }),
    {
      name: 'copy-assets',
      closeBundle() {
        // Копируем директорию assets в docs
        copyDir('assets', 'docs/assets');
        
        // Делаем дополнительную проверку и копирование иконок и логотипов, 
        // чтобы они были доступны и в оригинальной структуре
        try {
          // Создаем необходимые директории, если они отсутствуют
          if (!fs.existsSync('docs/assets/img')) {
            mkdirSync('docs/assets/img', { recursive: true });
          }
          
          // Убедимся, что подпапки существуют
          if (!fs.existsSync('docs/assets/img/layout')) {
            mkdirSync('docs/assets/img/layout', { recursive: true });
          }
          
          if (!fs.existsSync('docs/assets/img/icons')) {
            mkdirSync('docs/assets/img/icons', { recursive: true });
          }
          
          // Логгинг для отладки
          console.log('Successfully created image directories');
        } catch (error) {
          console.error('Error creating image directories:', error);
        }
      }
    },
    {
      name: 'copy-main-js',
      closeBundle() {
        // Копируем main.js в папку assets для прямого подключения
        try {
          if (fs.existsSync('main.js')) {
            // Убедимся, что директория существует
            if (!fs.existsSync('docs/assets')) {
              mkdirSync('docs/assets', { recursive: true });
            }
            fs.copyFileSync('main.js', 'docs/assets/main.js');
            
            // Дополнительно копируем его в js директорию для поддержки разных путей
            if (!fs.existsSync('docs/assets/js')) {
              mkdirSync('docs/assets/js', { recursive: true });
            }
            fs.copyFileSync('main.js', 'docs/assets/js/main.js');
            
            console.log('Successfully copied main.js to docs/assets folder and docs/assets/js folder');
          }
        } catch (error) {
          console.error('Error copying main.js file:', error);
        }
      }
    },
    {
      name: 'fix-image-paths',
      closeBundle() {
        // Исправляем пути к изображениям в HTML файлах
        try {
          // Список файлов для обработки
          const htmlFiles = ['index.html', 'vacancies.html', 'contacts.html', 'helper.html', 'payments.html', 'order-tracking.html', 'news.html', 'services.html'];
          
          htmlFiles.forEach(file => {
            const filePath = `docs/${file}`;
            if (fs.existsSync(filePath)) {
              let content = fs.readFileSync(filePath, 'utf-8');
              
              // Общее исправление путей к ресурсам
              // Заменяем все относительные пути на правильную структуру
              
              // 1. Логотипы
              content = content.replace(/src="\.\/assets\/img\/Logotype_aerline\.png"/g, 'src="./assets/img/layout/Logotype_aerline.png"');
              content = content.replace(/src="\.\/assets\/img\/Logotype_aerline_white\.png"/g, 'src="./assets/img/layout/Logotype_aerline_white.png"');
              
              // 2. Общая обработка иконок
              const iconFiles = ['logos_telegram', 'logos_whatsapp-icon', 'cube', 'q', 'messages3', 'callcalling', 'messages3_white', 'callcalling_white'];
              iconFiles.forEach(icon => {
                // Исправляем пути в любой части URL, искать везде, а не только после assets/img
                content = content.replace(new RegExp(`src="[^"]*${icon}\\.svg"`, 'g'), `src="./assets/img/icons/${icon}.svg"`);
              });
              
              // 3. Исправляем ссылки на скрипты
              content = content.replace(/src="\.\/main\.js"/g, 'src="./assets/main.js"');
              
              // 4. Исправляем ссылки на стили
              content = content.replace(/href="\.\/assets\/css\/main\.css"/g, 'href="./assets/css/main.css"');
              
              fs.writeFileSync(filePath, content, 'utf-8');
              console.log(`Fixed resources paths in ${file}`);
            }
          });
        } catch (error) {
          console.error('Error fixing resource paths:', error);
        }
      }
    },
    {
      name: 'copy-nojekyll',
      closeBundle() {
        // Копируем файл .nojekyll в docs для GitHub Pages
        try {
          if (fs.existsSync('.nojekyll')) {
            fs.copyFileSync('.nojekyll', 'docs/.nojekyll');
            console.log('Successfully copied .nojekyll to docs folder');
          }
        } catch (error) {
          console.error('Error copying .nojekyll file:', error);
        }
      }
    },
    {
      name: 'verify-and-fix-assets',
      closeBundle() {
        // Проверка наличия всех необходимых ассетов и исправление проблем
        try {
          console.log('Проверка и исправление ассетов...');
          
          // 1. Проверка CSS
          if (!fs.existsSync('docs/assets/css/main.css')) {
            console.log('CSS файл не найден, создаем директорию и копируем...');
            
            if (!fs.existsSync('docs/assets/css')) {
              mkdirSync('docs/assets/css', { recursive: true });
            }
            
            // Если есть исходный CSS, копируем его
            if (fs.existsSync('assets/css/main.css')) {
              fs.copyFileSync('assets/css/main.css', 'docs/assets/css/main.css');
              console.log('CSS файл скопирован из assets/css/main.css');
            }
          }
          
          // 2. Проверка JS
          if (!fs.existsSync('docs/assets/main.js')) {
            console.log('main.js не найден в docs/assets, копируем...');
            
            if (!fs.existsSync('docs/assets')) {
              mkdirSync('docs/assets', { recursive: true });
            }
            
            if (fs.existsSync('main.js')) {
              fs.copyFileSync('main.js', 'docs/assets/main.js');
              console.log('main.js скопирован в docs/assets/main.js');
            }
          }
          
          // 3. Проверка дубликатов изображений (могут быть и в корне, и в подпапках)
          const sourceIconsFiles = fs.readdirSync('assets/img/icons');
          const sourceLayoutFiles = fs.readdirSync('assets/img/layout');
          
          if (fs.existsSync('docs/assets/img')) {
            // Перебираем все файлы в docs/assets/img и проверяем, должны ли они быть в подпапке
            const imgFiles = fs.readdirSync('docs/assets/img')
              .filter(file => file.endsWith('.svg') || file.endsWith('.png') || file.endsWith('.jpg'));
            
            imgFiles.forEach(file => {
              // Если файл должен быть в icons
              if (sourceIconsFiles.includes(file)) {
                if (!fs.existsSync(`docs/assets/img/icons/${file}`)) {
                  // Создаем директорию, если нет
                  if (!fs.existsSync('docs/assets/img/icons')) {
                    mkdirSync('docs/assets/img/icons', { recursive: true });
                  }
                  
                  // Копируем файл в подпапку
                  fs.copyFileSync(`docs/assets/img/${file}`, `docs/assets/img/icons/${file}`);
                  console.log(`Скопирован файл ${file} в icons подпапку`);
                }
              }
              
              // Если файл должен быть в layout
              if (sourceLayoutFiles.includes(file)) {
                if (!fs.existsSync(`docs/assets/img/layout/${file}`)) {
                  // Создаем директорию, если нет
                  if (!fs.existsSync('docs/assets/img/layout')) {
                    mkdirSync('docs/assets/img/layout', { recursive: true });
                  }
                  
                  // Копируем файл в подпапку
                  fs.copyFileSync(`docs/assets/img/${file}`, `docs/assets/img/layout/${file}`);
                  console.log(`Скопирован файл ${file} в layout подпапку`);
                }
              }
            });
          }
          
          console.log('Проверка и исправление ассетов завершена');
        } catch (error) {
          console.error('Ошибка при проверке и исправлении ассетов:', error);
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
    outDir: 'docs',
    emptyOutDir: true,
    // Настраиваем минификацию, чтобы сохранить имена функций
    minify: 'terser',
    // Настраиваем postcss для правильной обработки tailwind
    cssCodeSplit: true,
    cssTarget: ['chrome52', 'firefox52', 'safari10'],
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
        // Именование файлов без хешей для простого открытия
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          // Сохраняем оригинальную структуру для ресурсов
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name][extname]';
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            // Сохраняем структуру для изображений
            const imgPath = assetInfo.name;
            
            // Проверяем, содержит ли путь подпапки
            if (imgPath.includes('layout/')) {
              return 'assets/img/layout/[name][extname]';
            } else if (imgPath.includes('icons/')) {
              return 'assets/img/icons/[name][extname]';
            }
            // Для остальных изображений
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