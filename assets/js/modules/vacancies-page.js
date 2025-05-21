/**
 * vacancies-page.js
 * Модуль для функциональности страницы вакансий
 */

/**
 * Инициализация функционала для страницы вакансий
 */
export function initVacanciesPage() {
  // Аккордеон для вакансий
  const vacancyToggleButtons = document.querySelectorAll('.vacancy-toggle');
  if (vacancyToggleButtons.length > 0) {
    vacancyToggleButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const content = this.parentElement.querySelector('.vacancy-content');
        const icon = this.querySelector('svg');

        if (content.classList.contains('hidden')) {
          content.classList.remove('hidden');
          icon.classList.add('rotate-180');
        } else {
          content.classList.add('hidden');
          icon.classList.remove('rotate-180');
        }
      });
    });

    // Фильтрация вакансий по городам
    const cityFilter = document.getElementById('cityFilter');
    if (cityFilter) {
      cityFilter.addEventListener('change', function () {
        const selectedCity = this.value;
        const vacancyItems = document.querySelectorAll('.vacancy-item');

        vacancyItems.forEach(item => {
          const location = item.getAttribute('data-location');

          if (selectedCity === 'all' || location.includes(selectedCity)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  }
} 