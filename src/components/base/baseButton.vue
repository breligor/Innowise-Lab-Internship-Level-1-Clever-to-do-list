<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton",
};
</script>

<style lang="scss" scoped>
@import "bulma/css/bulma.min.css";
</style>
