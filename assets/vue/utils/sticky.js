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
        const computedStyle = window.getComputedStyle(el);
        const originalPosition = computedStyle.position;
        const originalTop = computedStyle.top;
        const originalZIndex = computedStyle.zIndex;
        const originalAlignSelf = computedStyle.alignSelf;
        
        // Функция для применения sticky стилей
        const applySticky = () => {
            if (window.innerWidth >= breakpoint) {
                el.style.position = 'sticky';
                el.style.top = `${topOffset}px`;
                el.style.zIndex = zIndex;
                el.style.alignSelf = 'flex-start'; // Важно для flex-контейнеров
            } else {
                el.style.position = originalPosition || 'static';
                el.style.top = originalTop || 'auto';
                el.style.zIndex = originalZIndex || 'auto';
                el.style.alignSelf = originalAlignSelf || 'auto';
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
            originalAlignSelf,
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
            el.style.alignSelf = 'flex-start';
        } else {
            // Восстанавливаем исходные стили
            if (el._stickyData) {
                el.style.position = el._stickyData.originalPosition || 'static';
                el.style.top = el._stickyData.originalTop || 'auto';
                el.style.zIndex = el._stickyData.originalZIndex || 'auto';
                el.style.alignSelf = el._stickyData.originalAlignSelf || 'auto';
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
            el.style.position = el._stickyData.originalPosition || 'static';
            el.style.top = el._stickyData.originalTop || 'auto';
            el.style.zIndex = el._stickyData.originalZIndex || 'auto';
            el.style.alignSelf = el._stickyData.originalAlignSelf || 'auto';
            delete el._stickyData;
        }
    }
};

