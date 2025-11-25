/**
 * Vue 3 директива для создания прилипающих элементов
 * Работает только на больших экранах (lg и выше)
 */
export const vSticky = {
    mounted(el, binding) {
        const options = binding.value || {};
        const topOffset = options.top || 16; // Отступ сверху в пикселях
        const zIndex = options.zIndex || 1000;
        const enabled = options.disabled !== true;
        const breakpoint = options.breakpoint || 1024; // lg breakpoint по умолчанию
        
        if (!enabled) {
            return;
        }

        // Сохраняем исходные стили
        const originalPosition = window.getComputedStyle(el).position;
        const originalTop = window.getComputedStyle(el).top;
        const originalZIndex = window.getComputedStyle(el).zIndex;
        
        // Функция для применения sticky стилей
        const applySticky = () => {
            if (window.innerWidth >= breakpoint) {
                el.style.position = 'sticky';
                el.style.top = `${topOffset}px`;
                el.style.zIndex = zIndex;
            } else {
                el.style.position = originalPosition;
                el.style.top = originalTop;
                el.style.zIndex = originalZIndex;
            }
        };
        
        // Применяем сразу
        applySticky();
        
        // Обработчик изменения размера окна
        const handleResize = () => {
            applySticky();
        };
        
        window.addEventListener('resize', handleResize);
        
        // Сохраняем данные для cleanup
        el._stickyData = {
            originalPosition,
            originalTop,
            originalZIndex,
            handleResize
        };
    },
    
    updated(el, binding) {
        const options = binding.value || {};
        const enabled = options.disabled !== true;
        const breakpoint = options.breakpoint || 1024;
        
        if (enabled && window.innerWidth >= breakpoint) {
            const topOffset = options.top || 16;
            const zIndex = options.zIndex || 1000;
            el.style.position = 'sticky';
            el.style.top = `${topOffset}px`;
            el.style.zIndex = zIndex;
        } else {
            // Восстанавливаем исходные стили
            if (el._stickyData) {
                el.style.position = el._stickyData.originalPosition;
                el.style.top = el._stickyData.originalTop;
                el.style.zIndex = el._stickyData.originalZIndex;
            }
        }
    },
    
    unmounted(el) {
        // Удаляем обработчик события
        if (el._stickyData && el._stickyData.handleResize) {
            window.removeEventListener('resize', el._stickyData.handleResize);
        }
        
        // Восстанавливаем исходные стили при размонтировании
        if (el._stickyData) {
            el.style.position = el._stickyData.originalPosition;
            el.style.top = el._stickyData.originalTop;
            el.style.zIndex = el._stickyData.originalZIndex;
            delete el._stickyData;
        }
    }
};

