<template>
    <transition name="toast">
      <slot></slot>
    </transition>
  </template>
  <script>
  export default {
    
  };
  </script>
  <style>

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.toast-enter-active, .toast-leave-active {
  transition: all 0.5s ease;
}

  </style>