import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';
import fs from 'fs';
import matter from 'front-matter';
import { copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Функция для определения базового пути в зависимости от окружения
function getBase() {
  return '/';
}

// Функция для чтения front matter из HTML-файлов
function getPageData() {
  const pages = {};
  
  // Список файлов для обработки
  const files = [
    'index.html',
    'vacancies.html',
    'contacts.html',
    'helper.html',
    'payments.html',
    'order-tracking.html',
    'news.html',
    'services.html',
    'service-acts.html',
    'senders-receivers.html',
    'profile.html',
    'modal-test.html',
    'reconciliation-act.html',
    'notifications.html',
    'cooperation.html',
    'calculator.html',
    'order-new.html',
    'bulk-order.html',
    'user-create.html',
    'order-list.html'
  ];
  
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

// Загрузка данных отправителей и получателей из JSON
function getSendersReceiversData() {
  try {
    const data = fs.readFileSync('./assets/data/senders-receivers.json', 'utf-8');
    const parsedData = JSON.parse(data);
    console.log('Данные отправителей и получателей:', parsedData.length);
    return parsedData;
  } catch (error) {
    console.error('Error reading senders-receivers data:', error);
    return [];
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

// Загрузка данных о сервисных актах
function getServiceActsData() {
  try {
    const serviceActsData = fs.readFileSync('./assets/data/service-acts.json', 'utf-8');
    return JSON.parse(serviceActsData);
  } catch (error) {
    console.error('Error reading service acts data:', error);
    return [];
  }
}

// Загрузка данных основного меню
function getMainMenuData() {
  try {
    const menuData = fs.readFileSync('./assets/data/menu-main.json', 'utf-8');
    return JSON.parse(menuData);
  } catch (error) {
    console.error('Error reading main menu data:', error);
    return [];
  }
}

// Загрузка данных меню пользователя
function getUserMenuData() {
  try {
    const menuData = fs.readFileSync('./assets/data/menu-user.json', 'utf-8');
    return JSON.parse(menuData);
  } catch (error) {
    console.error('Error reading user menu data:', error);
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

// Вспомогательная функция для безопасной проверки подстрок
function safeContains(str, substr) {
  return str?.includes?.(substr) || false;
}

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  // Определяем, используется ли HTTPS из аргументов командной строки
  const useHttps = process.argv.includes('--https');
  
  return {
    base: './',
    // Настройки сервера в зависимости от режима запуска
    server: {
      host: true,
      // HTTPS только если указан аргумент --https
      https: useHttps,
      cors: true
    },
    build: {
      outDir: 'docs',
      emptyOutDir: true,
      assetsInlineLimit: 0,
      manifest: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          contacts: resolve(__dirname, 'contacts.html'),
          vacancies: resolve(__dirname, 'vacancies.html'),
          payments: resolve(__dirname, 'payments.html'),
          services: resolve(__dirname, 'services.html'),
          news: resolve(__dirname, 'news.html'),
          orderTracking: resolve(__dirname, 'order-tracking.html'),
          helper: resolve(__dirname, 'helper.html'),
          serviceActs: resolve(__dirname, 'service-acts.html'),
          sendersReceivers: resolve(__dirname, 'senders-receivers.html'),
          profile: resolve(__dirname, 'profile.html'),
          modalTest: resolve(__dirname, 'modal-test.html'),
          reconciliationAct: resolve(__dirname, 'reconciliation-act.html'),
          notifications: resolve(__dirname, 'notifications.html'),
          cooperation: resolve(__dirname, 'cooperation.html'),
          calculator: resolve(__dirname, 'calculator.html'),
          orderNew: resolve(__dirname, 'order-new.html'),
          bulkOrder: resolve(__dirname, 'bulk-order.html'),
          userCreate: resolve(__dirname, 'user-create.html'),
          orderList: resolve(__dirname, 'order-list.html')
        },
        output: {
          assetFileNames: (assetInfo) => {
            if (/\.css$/.test(assetInfo.name)) {
              return `assets/css/[name]-[hash].[ext]`;
            }
            
            if (/\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
              return `assets/img/[name].[ext]`;
            }
            
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return `assets/fonts/[name].[ext]`;
            }
            
            return `assets/[ext]/[name].[ext]`;
          }
        }
      },
      minify: isProduction,
      sourcemap: !isProduction,
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer,
        ],
      },
    },
    plugins: [
      // Плагин для обработки Handlebars шаблонов
      handlebars({
        partialDirectory: resolve(__dirname, 'assets/partials'),
        helpers: {
          // Хелпер lt (less than) для сравнения чисел
          lt: (a, b) => a < b,
          // Хелпер eq (equals) для сравнения значений
          eq: (a, b) => a === b,
          contains: (str, substr) => safeContains(str, substr),
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
          },
          json: function(context) {
            return JSON.stringify(context);
          },
          // Хелпер для создания плоского списка меню без вложенности
          flattenMenu: function(menu) {
            const flattened = [];
            menu.forEach(item => {
              if (item.submenu) {
                item.submenu.forEach(subitem => {
                  flattened.push(subitem);
                });
              } else {
                flattened.push(item);
              }
            });
            return flattened;
          },
          // Хелпер для получения первой половины массива
          firstHalf: function(array) {
            const half = Math.ceil(array.length / 2);
            return array.slice(0, half);
          },
          // Хелпер для получения второй половины массива
          secondHalf: function(array) {
            const half = Math.ceil(array.length / 2);
            return array.slice(half);
          }
        },
        context(pagePath) {
          const pageData = getPageData();
          const fileName = pagePath.split('/').pop();
          const pageContext = pageData[fileName] || {};
          
          // Общие данные для всех страниц
          const commonData = {
            title: 'Aeroline',
            description: 'Транспортная компания Aeroline',
            isProduction: isProduction,
            isDev: !isProduction,
            basePath: getBase(),
            siteName: 'Aeroline',
            mainMenu: getMainMenuData(),
            userMenu: getUserMenuData()
          };
          
          // Специфичные данные для разных страниц
          let specificData = {};
          
          if (fileName === 'vacancies.html') {
            specificData = { vacancies: getVacanciesData() };
          
            // Группируем вакансии по городам для фильтрации
            const cities = new Set();
            specificData.vacancies.forEach(vacancy => {
              const city = vacancy.location.split(',')[0].trim();
              cities.add(city);
            });
            specificData.cities = Array.from(cities);
          } else if (fileName === 'index.html') {
            specificData = { 
              sliders: getSlidersData(),
              newsData: getNewsData(),
              defaultOffice: getDefaultOfficeData()
            };
            
            // Добавляем все офисы, как на странице контактов
            const contactsData = getContactsData();
            if (contactsData.offices && contactsData.offices.length > 0) {
              specificData.offices = contactsData.offices;
              // Выбираем случайный офис для отображения на карте
              const randomIndex = Math.floor(Math.random() * Math.min(9, contactsData.offices.length));
              specificData.selectedOffice = contactsData.offices[randomIndex];
              specificData.selectedOfficeIndex = randomIndex;
            }
          } else if (fileName === 'contacts.html') {
            const contactsData = getContactsData();
            specificData = { ...contactsData, defaultOffice: getDefaultOfficeData() };
          
            // Группируем офисы по городам для фильтрации
            const cities = new Set();
            if (contactsData.offices && contactsData.offices.length > 0) {
              contactsData.offices.forEach(office => {
                cities.add(office.city);
              });
            }
            specificData.cities = Array.from(cities);
          } else if (fileName === 'news.html') {
            specificData = { newsData: getNewsData() };
          } else if (fileName === 'payments.html') {
            specificData = { paymentsFaq: getPaymentsFaqData() };
          } else if (fileName === 'service-acts.html') {
            specificData = { serviceActs: getServiceActsData() };
          } else if (fileName === 'senders-receivers.html') {
            specificData = { sendersReceivers: getSendersReceiversData() };
          }
          
          return {
            ...commonData,
            ...pageContext,
            ...specificData
          };
        }
      }),
      
      // Плагин для обслуживания JS бандлов в режиме разработки
      {
        name: 'serve-js-bundles',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            // Обработка запросов к main.js (для ссылок в HTML)
            if (req.url === '/main.js' || req.url === '/assets/js/main.js') {
              const mainJsPath = resolve(__dirname, 'assets/js/main.js');
              if (fs.existsSync(mainJsPath)) {
                res.setHeader('Content-Type', 'application/javascript');
                const content = fs.readFileSync(mainJsPath, 'utf8');
                res.end(content);
                return;
              }
            }
            
            // Обработка запросов к bundle.js
            if (req.url === '/assets/js/bundle.js') {
              const bundlePath = resolve(__dirname, 'assets/js/bundle.js');
              if (fs.existsSync(bundlePath)) {
                res.setHeader('Content-Type', 'application/javascript');
                res.end(fs.readFileSync(bundlePath, 'utf8'));
                return;
              }
            }
            
            next();
          });
        }
      },
      
      // Плагин для копирования ресурсов при сборке
      {
        name: 'copy-assets',
        apply: 'build',
        closeBundle() {
          // Копируем данные
          if (fs.existsSync('./assets/data')) {
            copyDir('./assets/data', './docs/assets/data');
          }
          
          // Создаем .nojekyll для GitHub Pages
          fs.writeFileSync('./docs/.nojekyll', '');
        }
      },
      
      // Плагин для обновления ссылок на скрипты в HTML-файлах
      {
        name: 'update-html-links',
        apply: 'build',
        closeBundle() {
          const htmlFiles = [
            'index.html',
            'contacts.html',
            'vacancies.html',
            'payments.html',
            'services.html',
            'news.html',
            'order-tracking.html',
            'helper.html',
            'service-acts.html',
            'senders-receivers.html',
            'profile.html',
            'modal-test.html',
            'reconciliation-act.html',
            'notifications.html',
            'cooperation.html',
            'calculator.html',
            'order-new.html',
            'bulk-order.html',
            'user-create.html',
            'order-list.html'
          ];
          
          htmlFiles.forEach(file => {
            const filePath = resolve(__dirname, 'docs', file);
            if (fs.existsSync(filePath)) {
              try {
                let content = fs.readFileSync(filePath, 'utf8');
                
                // Заменяем пути к изображениям и другим ассетам
                content = content.replace(/src="\/assets\//g, 'src="./assets/');
                content = content.replace(/href="\/assets\//g, 'href="./assets/');
                
                // Заменяем пути к страницам
                content = content.replace(/href="\//g, 'href="./');
                
                // Обновляем тег скрипта (без type="module")
                content = content.replace(
                  /<script[^>]*src="[^"]*bundle\.js"[^>]*><\/script>/g,
                  '<script src="./assets/js/bundle.js"></script>'
                );
                
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Файл ${filePath} успешно обновлен`);
              } catch (error) {
                console.error(`Ошибка при обновлении файла ${filePath}:`, error);
              }
            }
          });
        }
      }
    ]
  };
}); 