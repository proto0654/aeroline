import { createPinia, setActivePinia } from 'pinia';
import { useGlobalModalStore } from '../stores/globalModal.js';
import { useAuthStore } from '../stores/auth.js';

/**
 * Инициализация глобальной Pinia и глобальных stores
 * Этот файл должен загружаться первым на всех страницах
 */
function initGlobalPinia() {
  // Создаем глобальную Pinia, если её еще нет
  if (!window.pinia) {
    window.pinia = createPinia();
    // Устанавливаем активную Pinia для использования stores вне компонентов
    setActivePinia(window.pinia);
    console.log('Глобальная Pinia создана и активирована');
  }

  // Инициализируем глобальные stores только если Pinia создана
  if (window.pinia) {
    // Убеждаемся, что Pinia активна перед использованием stores
    setActivePinia(window.pinia);
    
    if (!window.globalModalStore) {
      window.globalModalStore = useGlobalModalStore();
      console.log('Global modal store инициализирован:', window.globalModalStore);
    }

    if (!window.authStore) {
      window.authStore = useAuthStore();
      // Проверяем авторизацию при загрузке страницы
      window.authStore.checkAuth();
      console.log('Auth store инициализирован:', window.authStore);
    }
  } else {
    console.error('Не удалось создать глобальную Pinia');
  }
}

// Инициализируем сразу, без ожидания DOMContentLoaded
// Это важно для dev режима, где модули загружаются асинхронно
console.log('[global-pinia.js] Начало загрузки модуля');
initGlobalPinia();
console.log('[global-pinia.js] Модуль загружен, Pinia:', window.pinia ? 'создана' : 'НЕ создана');

// Также слушаем DOMContentLoaded на случай, если скрипт загрузился до готовности DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Повторная инициализация не нужна, но можно проверить что все на месте
    if (!window.pinia) {
      console.warn('Pinia не была инициализирована при первой попытке, повторная инициализация...');
      initGlobalPinia();
    }
  });
}

