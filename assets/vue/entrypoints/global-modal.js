import { createApp } from 'vue';
import GlobalModalHost from '../components/GlobalModalHost.vue';

/**
 * Инициализация глобальной модалки
 * Требует, чтобы global-pinia.js был загружен первым
 */
async function initGlobalModal() {
  const globalModalContainer = document.querySelector('.vue-app-mount-point');

  if (globalModalContainer) {
    // Ждем инициализации Pinia (до 5 секунд)
    let attempts = 0;
    while (!window.pinia && attempts < 100) {
      await new Promise(resolve => setTimeout(resolve, 50));
      attempts++;
    }
    
    // Проверяем, что Pinia инициализирована
    if (!window.pinia) {
      console.error('Pinia не инициализирована. Убедитесь, что global-pinia.js загружен перед global-modal.js');
      return;
    }

    const app = createApp(GlobalModalHost);
    app.use(window.pinia);
    app.mount(globalModalContainer);

    console.log('Global modal host инициализирован');
  } else {
    console.warn('Global modal host container .vue-app-mount-point not found.');
  }
}

// Проверяем состояние документа и инициализируем соответственно
if (document.readyState === 'loading') {
  // Документ еще загружается, ждем DOMContentLoaded
  document.addEventListener('DOMContentLoaded', initGlobalModal);
} else {
  // Документ уже загружен, инициализируем сразу
  initGlobalModal();
} 