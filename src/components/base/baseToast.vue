<template>
  <div class="notification is-danger is-light toast">
    <button class="delete" @click="closeToast()"></button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "baseToast",
  methods: {
    closeToast() {
      this.$emit("closeToast", this.event);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "bulma/css/bulma.min.css";
.toast {
  position: absolute;
  z-index: 100;
  max-width: 250px;
}
</style>
