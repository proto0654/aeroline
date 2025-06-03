import { g as getBasePath } from "./utils-BNm1gLxD.js";
class LoginManager {
  constructor() {
    this.loginModal = document.getElementById("login-modal");
    this.loginForm = document.getElementById("login-form");
    this.basePath = getBasePath();
    this.init();
  }
  init() {
    if (!this.loginModal || !this.loginForm) return;
    document.addEventListener("click", (e) => {
      const loginBtn = e.target.closest('#mobile-menu-login, a[href*="profile.html"]');
      if (loginBtn) {
        e.preventDefault();
        modalManager.open(this.loginModal);
      }
    });
    this.loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      if (email === "test@aeroline.su" && password === "password123") {
        modalManager.close(this.loginModal);
        window.location.href = `${this.basePath}profile.html`;
      } else {
        alert("Неверный email или пароль");
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new LoginManager();
});
export {
  LoginManager as L
};
