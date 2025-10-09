const { execSync } = require("child_process");

try {
  console.log("🔨 Сборка проекта...");
  execSync("npm run build", { stdio: "inherit" });
  
  console.log("📦 Добавление файлов в Git...");
  execSync("git add .", { stdio: "inherit" });
  
  console.log("🔍 Проверка изменений...");
  const status = execSync("git status --porcelain", { encoding: "utf8" });
  
  if (status.trim()) {
    const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }).replace(/[.,]/g, "-");
    console.log("💾 Создание коммита...");
    execSync(`git commit -m "Обновление-${now}"`, { stdio: "inherit" });
    
    console.log("🚀 Отправка изменений...");
    execSync("git push origin main", { stdio: "inherit" });
    
    console.log("✅ Деплой завершен успешно!");
  } else {
    console.log("ℹ️  Нет изменений для коммита. Деплой пропущен.");
  }
} catch (error) {
  console.error("❌ Ошибка при деплое:", error.message);
  process.exit(1);
}
