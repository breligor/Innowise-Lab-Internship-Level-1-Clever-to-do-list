<template>
  <div class="notification is-danger is-light">
    <button class="delete" @click="closeToast()"></button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "baseToast",
  props: ["errMessage"],
  methods: {
    closeToast() {
      this.$emit("closeToast", this.event);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "bulma/css/bulma.min.css";
</style>
