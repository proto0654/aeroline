<template>
  <transition name="fade">
    <div 
      v-if="show"
      :class="[
        'alert p-4 rounded-lg my-4',
        type === 'success' ? 'alert-success' : 'alert-error'
      ]"
    >
      <div class="flex items-center">
        <span v-if="type === 'success'" class="mr-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </span>
        <span v-else class="mr-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </span>
        <span>{{ message }}</span>
        <button 
          v-if="dismissible" 
          @click="dismiss" 
          class="ml-auto text-gray-500 hover:text-gray-700"
          aria-label="Закрыть"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  },
  autoHide: {
    type: Boolean,
    default: true
  },
  duration: {
    type: Number,
    default: 5000
  },
  dismissible: {
    type: Boolean,
    default: true
  }
});

const show = ref(false);
let timer = null;

const dismiss = () => {
  show.value = false;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

const startTimer = () => {
  if (props.autoHide && props.message) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      show.value = false;
    }, props.duration);
  }
};

// Показываем сообщение, если оно есть
watch(() => props.message, (newMessage) => {
  if (newMessage) {
    show.value = true;
    startTimer();
  } else {
    show.value = false;
  }
});

onMounted(() => {
  if (props.message) {
    show.value = true;
    startTimer();
  }
});
</script>

<style scoped>
.alert-success {
  @apply bg-green-50 text-green-700 border border-green-200;
}

.alert-error {
  @apply bg-red-50 text-red-700 border border-red-200;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 