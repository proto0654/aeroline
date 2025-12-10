import { d as defineStore } from "./pinia-BykoCM9g.js";
import { r as ref, c as computed } from "./runtime-core.esm-bundler-xz8C70T0.js";
const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const user = ref(null);
  const token = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const isLoggedIn = computed(() => isAuthenticated.value && user.value !== null);
  const userName = computed(() => {
    var _a, _b;
    return ((_a = user.value) == null ? void 0 : _a.name) || ((_b = user.value) == null ? void 0 : _b.email) || "Пользователь";
  });
  const userEmail = computed(() => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.email) || "";
  });
  async function login(email, password) {
    loading.value = true;
    error.value = null;
    try {
      if (email === "test@aeroline.su" && password === "password123") {
        const userData = {
          id: 1,
          email,
          name: "Тестовый пользователь",
          role: "user"
        };
        user.value = userData;
        token.value = "mock-token-" + Date.now();
        isAuthenticated.value = true;
        localStorage.setItem("auth_token", token.value);
        localStorage.setItem("user_data", JSON.stringify(userData));
        loading.value = false;
        return userData;
      } else {
        throw new Error("Неверный email или пароль");
      }
    } catch (err) {
      error.value = err.message || "Ошибка при входе";
      loading.value = false;
      throw err;
    }
  }
  function logout() {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    error.value = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
  }
  function checkAuth() {
    const savedToken = localStorage.getItem("auth_token");
    const savedUser = localStorage.getItem("user_data");
    if (savedToken && savedUser) {
      try {
        token.value = savedToken;
        user.value = JSON.parse(savedUser);
        isAuthenticated.value = true;
      } catch (err) {
        console.error("Ошибка при восстановлении состояния авторизации:", err);
        logout();
      }
    }
  }
  function updateUser(userData) {
    user.value = { ...user.value, ...userData };
    localStorage.setItem("user_data", JSON.stringify(user.value));
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
export {
  useAuthStore as u
};
