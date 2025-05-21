/**
 * slider.js
 * Модуль для работы со слайдерами Swiper
 */

import { loadScript, loadStyle } from './utils.js';

/**
 * Функция инициализации Swiper
 */
export function initSwiperSlider() {
  if (typeof Swiper === 'undefined') {
    console.error('Swiper не загружен!');
    return;
  }

  const swiper = new Swiper('.swiper-container', {
    // Базовые настройки
    slidesPerView: 1,
    spaceBetween: 0,

    // Цикличный режим
    loop: true,
    speed: 800,

    // Эффект fade
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    // Автопрокрутка
    autoplay: {
      delay: 70000,
      disableOnInteraction: false
    },

    // Пагинация - стандартная
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },

    // Навигационные кнопки
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Базовые колбеки
    on: {
      init: function () {
        console.log('Swiper инициализирован');
      }
    }
  });

  // Инициализируем свайпер для новостей, если он есть на странице
  if (document.querySelector('.news-swiper-container')) {
    console.log('Инициализация Swiper для новостей с уже существующими слайдами...');
    
    // Проверяем, есть ли уже слайды в контейнере
    const newsContainer = document.querySelector('.news-swiper-container .swiper-wrapper');
    const existingSlides = newsContainer ? newsContainer.querySelectorAll('.swiper-slide') : [];
    
    console.log(`Найдено ${existingSlides.length} существующих слайдов новостей от шаблонизатора`);
    
    // Инициализируем Swiper для новостей
    const newsSwiper = new Swiper('.news-swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: existingSlides.length > 1, // Включаем loop только если есть больше 1 слайда
      speed: 1100,
      // Эффект fade
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      // Автопрокрутка
      autoplay: {
        delay: 7000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.news-swiper-pagination',
        clickable: true
      },

      navigation: {
        nextEl: '.news-swiper-button-next',
        prevEl: '.news-swiper-button-prev',
      },

      breakpoints: {
        // На мобильных устройствах
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        // На планшетах
        768: {
          slidesPerView: 1,
          spaceBetween: 30
        }
      },

      on: {
        init: function () {
          console.log('Swiper новостей инициализирован');
        }
      }
    });
  }
}

/**
 * Динамическая загрузка Swiper
 * @returns {Promise} - промис, который разрешается после загрузки Swiper
 */
export function loadSwiper() {
  return new Promise((resolve, reject) => {
    try {
      // Загрузка стилей Swiper
      loadStyle('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css', (err) => {
        if (err) {
          console.error('Не удалось загрузить стили Swiper:', err);
          reject(err);
          return;
        }
        
        // Загрузка скрипта Swiper
        loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js', (err) => {
          if (err) {
            console.error('Не удалось загрузить библиотеку Swiper:', err);
            reject(err);
            return;
          }
          
          console.log('Swiper успешно загружен');
          
          // Вместо загрузки внешнего файла, инициализируем Swiper прямо здесь
          if (typeof Swiper !== 'undefined') {
            console.log('Инициализация Swiper...');
            setTimeout(() => {
              initSwiperSlider();
              resolve();
            }, 100);
          } else {
            reject(new Error('Swiper не определен после загрузки'));
          }
        });
      });
    } catch (error) {
      console.error('Ошибка при загрузке Swiper:', error);
      reject(error);
    }
  });
} 