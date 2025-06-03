function getBasePath() {
  const scripts = document.getElementsByTagName("script");
  const currentScript = scripts[scripts.length - 1];
  try {
    const scriptSrc = currentScript.src;
    if (scriptSrc.includes("://")) {
      const url = new URL(scriptSrc);
      const pathParts = url.pathname.split("/");
      pathParts.pop();
      if (pathParts[pathParts.length - 1] === "js" && pathParts[pathParts.length - 2] === "assets") {
        pathParts.pop();
        pathParts.pop();
      } else if (pathParts[pathParts.length - 1] === "assets") {
        pathParts.pop();
      }
      return pathParts.join("/") + "/";
    } else {
      const pathParts = scriptSrc.split("/");
      pathParts.pop();
      if (pathParts.length >= 2 && pathParts[pathParts.length - 1] === "js" && pathParts[pathParts.length - 2] === "assets") {
        pathParts.pop();
        pathParts.pop();
      } else if (pathParts.length >= 1 && pathParts[pathParts.length - 1] === "assets") {
        pathParts.pop();
      }
      return pathParts.join("/") + "/";
    }
  } catch (error) {
    console.error("Ошибка при определении базового пути:", error);
    return "./";
  }
}
function domReady(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = () => {
    if (callback) callback(null);
  };
  script.onerror = () => {
    if (callback) callback(new Error(`Не удалось загрузить скрипт: ${src}`));
  };
  document.head.appendChild(script);
}
function loadStyle(href, callback) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.onload = () => {
    if (callback) callback(null);
  };
  link.onerror = () => {
    if (callback) callback(new Error(`Не удалось загрузить стиль: ${href}`));
  };
  document.head.appendChild(link);
}
function getDeviceType() {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  return "desktop";
}
class PhoneValidator {
  constructor(input) {
    this.input = input;
    this.init();
  }
  init() {
    this.input.placeholder = "+7 (___) ___-__-__";
    this.input.addEventListener("blur", this.onBlur.bind(this));
    this.input.addEventListener("input", this.onInput.bind(this));
  }
  onInput(e) {
    const allowed = /[\d\+\-\(\) ]/g;
    let filtered = this.input.value.match(allowed);
    if (filtered) {
      this.input.value = filtered.join("");
    } else {
      this.input.value = "";
    }
    this.input.setCustomValidity("");
  }
  onBlur(e) {
    let value = this.input.value.replace(/[^\d\+]/g, "");
    if (value.startsWith("8")) value = "+7" + value.slice(1);
    if (value.startsWith("+7")) {
      if (value.length === 12) {
        const num = value.replace(/\D/g, "");
        this.input.value = `+7 (${num.slice(1, 4)}) ${num.slice(4, 7)}-${num.slice(7, 9)}-${num.slice(9, 11)}`;
        this.input.setCustomValidity("");
        return;
      }
    }
    this.input.setCustomValidity("Введите корректный номер телефона");
  }
}
export {
  PhoneValidator as P,
  getDeviceType as a,
  loadScript as b,
  domReady as d,
  getBasePath as g,
  loadStyle as l
};
