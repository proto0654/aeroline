import { createApp } from "vue";
import { initHomePage } from "../modules/home-page.js";
import {
  useGlobalModalStore /*, ModalCancelledError*/,
} from "../../vue/stores/globalModal.js"; // ModalCancelledError больше не нужен
import LoginForm from "../../vue/components/forms/LoginForm.vue";
import ContactForm from "../../vue/components/forms/ContactForm.vue"; // Импорт нового компонента контактной формы
import { initDirectionForm } from "../../vue/entrypoints/home-direction-form.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Инициализируем главную страницу
  initHomePage();

  const globalModal = useGlobalModalStore();

  // Монтируем компонент контактной формы
  const contactFormElement = document.getElementById("contact-form-app");
  if (contactFormElement) {
    createApp(ContactForm).mount(contactFormElement);
  }

  // Инициализируем форму направления доставки
  await initDirectionForm();

  // Обработчик нажатия на кнопку "Стать клиентом"
  // const becomeClientButtons = document.querySelectorAll('.become-client-btn');
  // if (becomeClientButtons.length > 0) {
  //   console.log('Кнопка(и) "Стать клиентом" найдена(ы).', becomeClientButtons);
  //   becomeClientButtons.forEach(btn => {
  //     btn.addEventListener('click', async (e) => {
  //       e.stopPropagation(); // Останавливаем распространение события, чтобы избежать закрытия модалки
  //       console.log('Клик по кнопке "Стать клиентом" зарегистрирован.');
  //       // Используем глобальный Pinia стор для открытия модального окна
  //       const result = await globalModal.openModal(BecomeClientForm, {
  //         initialData: { /* Если нужны начальные данные для формы */ }
  //       });
  //       console.log('Модалка "Стать клиентом" закрыта с результатом:', result);
  //       // Здесь можно обработать результат отправки формы, если нужно
  //       if (result.success) {
  //         alert(result.data.message);
  //       } else if (result.cancelled) {
  //         console.log('Модалка "Стать клиентом" была отменена.');
  //       } else {
  //         console.error('Модалка "Стать клиентом" закрыта с неизвестным результатом:', result);
  //       }
  //     });
  //   });
  // } else {
  //   console.warn('Кнопки с классом .become-client-btn не найдены на странице.');
  // }

  // Обработчик нажатия на кнопку "Войти" (логин)
  // Логика перенесена в global-ui.js для использования на всех страницах

  // Обработчик формы "Стать клиентом" (старый вариант, на случай если Vue не работает)
  // (Удалено, так как форма теперь только во Vue)
});
