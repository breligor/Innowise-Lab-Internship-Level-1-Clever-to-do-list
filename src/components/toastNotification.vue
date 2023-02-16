<template>
  <div class="toast-wrapper">
    <div class="notification is-danger">
      <button class="delete"></button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.toast-wrapper{
    position: fixed;
    width:100%;
    max-width: 300px;
    top:20px;
}
.notification {
    text-align:center;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
