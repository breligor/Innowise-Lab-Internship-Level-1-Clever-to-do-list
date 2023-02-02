<template>
  <input
    v-model="state.localValue"
    @keydown.enter="onUpdate"
    @blur="onUpdate"
  />
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const state = reactive({
  localValue: props.modelValue,
});

const onUpdate = () => {
  emit("update:modelValue", state.localValue);
};
</script>
