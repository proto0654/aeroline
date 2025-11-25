import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useWindowScroll, useElementBounding, useWindowSize } from '@vueuse/core';

/**
 * Композабл для sticky позиционирования элемента
 * @param {Object} options - Опции для sticky
 * @param {number} options.top - Отступ сверху в пикселях (по умолчанию 16)
 * @param {number} options.minWidth - Минимальная ширина экрана для активации sticky (по умолчанию 1024px для lg)
 * @returns {Object} - Объект с ref для элемента и стилями sticky
 */
export function useSticky(options = {}) {
    const { top = 16, minWidth = 1024 } = options;
    const elementRef = ref(null);
    const isSticky = ref(false);
    const isStickyToBottom = ref(false); // Новое состояние: прилипание к низу
    const bottomOffset = ref(0); // Отступ снизу для прилипания к низу
    
    const { y: scrollY } = useWindowScroll();
    const { width: windowWidth } = useWindowSize();
    
    const isLargeScreen = computed(() => windowWidth.value >= minWidth);

    const stickyStyle = computed(() => {
        if (!isSticky.value || !elementRef.value) return {};
        
        const rect = elementRef.value.getBoundingClientRect();
        const style = {
            position: 'fixed',
            width: `${rect.width}px`,
            zIndex: 10
        };
        
        // Если прилипаем к низу, используем bottom вместо top
        if (isStickyToBottom.value) {
            style.bottom = `${bottomOffset.value}px`;
        } else {
            style.top = `${top}px`;
        }
        
        return style;
    });

    let initialTop = null;
    let initialParentTop = null;
    let parentElement = null;
    let lastScrollDirection = null; // 'up' или 'down'

    function updateSticky() {
        if (!elementRef.value || !isLargeScreen.value) {
            isSticky.value = false;
            isStickyToBottom.value = false;
            return;
        }

        const rect = elementRef.value.getBoundingClientRect();
        const scrollTop = scrollY.value;
        
        // Определяем направление прокрутки
        const currentScrollDirection = scrollTop > (lastScrollDirection?.scrollTop || 0) ? 'down' : 'up';
        if (lastScrollDirection === null || currentScrollDirection !== lastScrollDirection.direction) {
            lastScrollDirection = { direction: currentScrollDirection, scrollTop };
        } else {
            lastScrollDirection.scrollTop = scrollTop;
        }
        
        // Находим родительский контейнер (колонку с bg-brand-light)
        if (!parentElement) {
            parentElement = elementRef.value.parentElement;
            // Ищем контейнер колонки (div с bg-brand-light)
            while (parentElement && parentElement !== document.body) {
                if (parentElement.classList.contains('bg-brand-light')) {
                    break;
                }
                const parentStyle = getComputedStyle(parentElement);
                if (parentStyle.overflow !== 'visible' && parentStyle.overflow !== '') {
                    break;
                }
                parentElement = parentElement.parentElement;
            }
            
            if (!parentElement || parentElement === document.body) {
                parentElement = elementRef.value.parentElement;
            }
        }

        const parentRect = parentElement.getBoundingClientRect();
        const elementHeight = rect.height;
        
        // Сохраняем начальные позиции при первом вызове (когда элемент еще не sticky)
        if (initialTop === null && !isSticky.value) {
            initialTop = rect.top + scrollTop;
            initialParentTop = parentRect.top + scrollTop;
        }
        
        // Вычисляем позиции относительно viewport
        const elementTopRelativeToViewport = rect.top;
        const parentTopRelativeToViewport = parentRect.top;
        const parentBottomRelativeToViewport = parentRect.bottom;
        
        // Элемент становится sticky когда:
        // 1. Прокрутка достигла его начальной позиции минус top
        // 2. И его верхняя граница достигла или прошла top отступа
        const stickyStart = initialTop - top;
        const shouldStartSticky = scrollTop >= stickyStart && elementTopRelativeToViewport <= top;
        
        // Проверяем, достиг ли элемент низа родителя
        // Когда элемент sticky сверху, его нижняя граница находится на top + elementHeight
        const elementBottomInStickyMode = top + elementHeight;
        const reachedBottom = elementBottomInStickyMode >= parentBottomRelativeToViewport;
        
        // Если верхняя граница родителя выше top, значит родитель еще не достиг своей начальной позиции
        // и элемент не должен быть sticky
        const shouldStopAtTop = parentTopRelativeToViewport > top;
        
        // Элемент должен быть sticky, если:
        // 1. Должен начать быть sticky И не должен остановиться сверху
        const shouldBeSticky = shouldStartSticky && !shouldStopAtTop;
        
        if (shouldBeSticky) {
            isSticky.value = true;
            
            // Если достигли низа родителя, прилипаем к низу
            if (reachedBottom) {
                isStickyToBottom.value = true;
                // Вычисляем отступ снизу (обновляем при каждой прокрутке)
                const windowHeight = window.innerHeight;
                bottomOffset.value = windowHeight - parentBottomRelativeToViewport;
            } else {
                // Иначе обычное sticky сверху
                isStickyToBottom.value = false;
            }
        } else {
            isSticky.value = false;
            isStickyToBottom.value = false;
            // Сбрасываем initialTop если элемент перестал быть sticky, чтобы пересчитать при следующем включении
            initialTop = null;
            initialParentTop = null;
        }
    }

    let rafId = null;
    function handleScroll() {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            updateSticky();
            rafId = null;
        });
    }

    onMounted(() => {
        if (elementRef.value) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', updateSticky, { passive: true });
            // Небольшая задержка для правильного расчета после монтирования
            setTimeout(updateSticky, 100);
        }
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', updateSticky);
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
    });

    // Отслеживаем изменения scrollY
    watch(scrollY, () => {
        handleScroll();
    });

    return {
        elementRef,
        isSticky,
        stickyStyle
    };
}

