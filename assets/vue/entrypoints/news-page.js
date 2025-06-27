import { createApp } from 'vue';
import NewsPageContainer from '../components/pages/news/NewsPageContainer.vue';
// import 'assets/js/main'; // Убедитесь, что основной JS-файл подключен, если он нужен для глобальных функций или инициализации

const newsPageApp = createApp(NewsPageContainer);

// Mount the app to the appropriate element in news.html
const newsPageElement = document.getElementById('news-page-app');
if (newsPageElement) {
  newsPageApp.mount(newsPageElement);
}

// Экспортируем newsPageApp, если потребуется доступ извне, например, для отладки
export { newsPageApp };