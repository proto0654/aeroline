/**
 * utils.js
 * Утилиты и вспомогательные функции
 */

// Определяем базовый путь для ресурсов, используя атрибуты скрипта
export function getBasePath() {
  // Получаем текущий скрипт
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1]; // Последний загруженный скрипт (наш файл)

  try {
    // Получаем путь к скрипту и извлекаем базовый путь
    const scriptSrc = currentScript.src;
    
    // Проверяем, содержит ли путь http:// или https://
    if (scriptSrc.includes('://')) {
      // Если это полный URL, извлекаем путь относительно корня сайта
      const url = new URL(scriptSrc);
      const pathParts = url.pathname.split('/');
      pathParts.pop(); // Удаляем имя файла (main.js)
      
      // Если скрипт находится в папке assets/js, удаляем две последние части пути
      if (pathParts[pathParts.length - 1] === 'js' && pathParts[pathParts.length - 2] === 'assets') {
        pathParts.pop(); // Удаляем js
        pathParts.pop(); // Удаляем assets
      }
      // Если скрипт находится в папке assets, удаляем последнюю часть пути
      else if (pathParts[pathParts.length - 1] === 'assets') {
        pathParts.pop(); // Удаляем assets
      }
      
      return pathParts.join('/') + '/';
    } else {
      // Если это относительный путь
      const pathParts = scriptSrc.split('/');
      pathParts.pop(); // Удаляем имя файла (main.js)
      
      // Если скрипт находится в папке assets/js, удаляем две последние части пути
      if (pathParts.length >= 2 && pathParts[pathParts.length - 1] === 'js' && pathParts[pathParts.length - 2] === 'assets') {
        pathParts.pop(); // Удаляем js
        pathParts.pop(); // Удаляем assets
      }
      // Если скрипт находится в папке assets, удаляем последнюю часть пути
      else if (pathParts.length >= 1 && pathParts[pathParts.length - 1] === 'assets') {
        pathParts.pop(); // Удаляем assets
      }
      
      return pathParts.join('/') + '/';
    }
  } catch (error) {
    console.error('Ошибка при определении базового пути:', error);
    // Возвращаем относительный путь от корня в случае ошибки
    return './';
  }
}

// Функция загрузки данных из JSON
export function loadJsonData(url, callback, basePath) {
  console.log('Загрузка JSON данных из:', url);
  
  // Проверка наличия URL
  if (!url) {
    console.error('Ошибка: не указан URL для загрузки JSON');
    if (callback) callback(new Error('Не указан URL'), null);
    return;
  }
  
  // Если путь не начинается с http или ./, добавляем BASE_PATH
  let fullUrl = url;
  if (!url.startsWith('http') && !url.startsWith('./') && !url.startsWith('../')) {
    // Предотвращаем дублирование 'assets' в пути
    if (url.startsWith('assets/')) {
      fullUrl = `${basePath}${url}`;
    } else {
      fullUrl = `${basePath}${url}`;
    }
    console.log('Модифицированный URL для загрузки:', fullUrl);
  }
  
  fetch(fullUrl)
    .then(response => {
      if (!response.ok) {
        console.log(`Не удалось загрузить данные из ${fullUrl}, пробуем альтернативный путь...`);
        // Пробуем альтернативный путь
        return fetch(`./${url}`);
      }
      return response;
    })
    .then(response => {
      if (!response.ok) {
        console.log(`Не удалось загрузить данные из ./${url}, пробуем последний вариант...`);
        // Пробуем ещё один альтернативный путь
        return fetch(`../${url}`);
      }
      return response;
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('JSON данные успешно загружены');
      if (callback) callback(null, data);
    })
    .catch(error => {
      console.error('Ошибка при загрузке JSON:', error);
      if (callback) callback(error, null);
    });
}

// Функция для проверки загрузки DOM
export function domReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Функция для динамической загрузки скриптов
export function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  
  script.onload = () => {
    if (callback) callback(null);
  };
  
  script.onerror = () => {
    if (callback) callback(new Error(`Не удалось загрузить скрипт: ${src}`));
  };
  
  document.head.appendChild(script);
}

// Функция для динамической загрузки стилей
export function loadStyle(href, callback) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  
  link.onload = () => {
    if (callback) callback(null);
  };
  
  link.onerror = () => {
    if (callback) callback(new Error(`Не удалось загрузить стиль: ${href}`));
  };
  
  document.head.appendChild(link);
}

// Определение текущего типа устройства
export function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  return 'desktop';
}

// Класс для маски и валидации номера телефона (принимает +7 и 8, не мешает редактированию)
export class PhoneValidator {
  constructor(input) {
    this.input = input;
    this.init();
  }

  init() {
    this.input.placeholder = '+7 (___) ___-__-__';
    this.input.addEventListener('blur', this.onBlur.bind(this));
    this.input.addEventListener('input', this.onInput.bind(this));
  }

  onInput(e) {
    // Удаляем невалидные символы (разрешаем только цифры, +, пробел, -, (, ))
    const allowed = /[\d\+\-\(\) ]/g;
    let filtered = this.input.value.match(allowed);
    if (filtered) {
      this.input.value = filtered.join('');
    } else {
      this.input.value = '';
    }
    // Не форматируем, чтобы не мешать курсору
    this.input.setCustomValidity('');
  }

  onBlur(e) {
    let value = this.input.value.replace(/[^\d\+]/g, '');
    // Приводим 8 к +7
    if (value.startsWith('8')) value = '+7' + value.slice(1);
    if (value.startsWith('+7')) {
      if (value.length === 12) {
        // Форматируем красиво
        const num = value.replace(/\D/g, '');
        this.input.value = `+7 (${num.slice(1,4)}) ${num.slice(4,7)}-${num.slice(7,9)}-${num.slice(9,11)}`;
        this.input.setCustomValidity('');
        return;
      }
    }
    this.input.setCustomValidity('Введите корректный номер телефона');
  }
} 