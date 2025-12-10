import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

/**
 * Store для управления состоянием авторизации пользователя
 * Доступен глобально на всех страницах через window.pinia
 */
export const useAuthStore = defineStore('auth', () => {
  // Состояние авторизации
  const isAuthenticated = ref(false);
  const user = ref(null);
  const token = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Вычисляемые свойства
  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null);
  const userName = computed(() => user.value?.name || user.value?.email || 'Пользователь');
  const userEmail = computed(() => user.value?.email || '');

  /**
   * Вход пользователя
   * @param {string} email - Email пользователя
   * @param {string} password - Пароль пользователя
   * @returns {Promise<Object>} Данные пользователя
   */
  async function login(email, password) {
    loading.value = true;
    error.value = null;

    try {
      // TODO: Заменить на реальный API запрос
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();

      // Временная заглушка для тестирования
      if (email === 'test@aeroline.su' && password === 'password123') {
        const userData = {
          id: 1,
          email: email,
          name: 'Тестовый пользователь',
          role: 'user'
        };
        
        user.value = userData;
        token.value = 'mock-token-' + Date.now();
        isAuthenticated.value = true;
        
        // Сохраняем в localStorage для сохранения состояния при перезагрузке
        localStorage.setItem('auth_token', token.value);
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        loading.value = false;
        return userData;
      } else {
        throw new Error('Неверный email или пароль');
      }
    } catch (err) {
      error.value = err.message || 'Ошибка при входе';
      loading.value = false;
      throw err;
    }
  }

  /**
   * Выход пользователя
   */
  function logout() {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    error.value = null;
    
    // Очищаем localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }

  /**
   * Проверка авторизации при загрузке страницы
   * Восстанавливает состояние из localStorage
   */
  function checkAuth() {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user_data');
    
    if (savedToken && savedUser) {
      try {
        token.value = savedToken;
        user.value = JSON.parse(savedUser);
        isAuthenticated.value = true;
      } catch (err) {
        console.error('Ошибка при восстановлении состояния авторизации:', err);
        logout();
      }
    }
  }

  /**
   * Обновление данных пользователя
   * @param {Object} userData - Новые данные пользователя
   */
  function updateUser(userData) {
    user.value = { ...user.value, ...userData };
    localStorage.setItem('user_data', JSON.stringify(user.value));
  }

  return {
    // State
    isAuthenticated,
    user,
    token,
    loading,
    error,
    // Computed
    isLoggedIn,
    userName,
    userEmail,
    // Actions
    login,
    logout,
    checkAuth,
    updateUser
  };
});

