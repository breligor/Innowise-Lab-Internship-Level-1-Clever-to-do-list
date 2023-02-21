<template>
  <input
    class="input"    
    @keydown.enter="updateInput"
    @blur="updateInput"
    :type="type"
    :value="modelValue"    
  />
</template>

<script >

export default {
  name: "BaseInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },  
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
  }

</script>

<style lang="scss" scoped>
@import "bulma/css/bulma.min.css";

</style>