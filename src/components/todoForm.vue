<template>
  <form @submit.prevent="addTodo">
    <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <base-input
          v-model="newTodoContent"
          type="text"
          placeholder="Add a todo..."
        />
      </p>
      <p class="control">
        <base-input v-model="makeDay" type="date" required />
      </p>
      <p class="control">
        <base-button :disabled="!newTodoContent" class="is-info">
          Add
        </base-button>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      props: ["newTodoContent"],
      newTodoContent: "",
      makeDay: "",
    };
  },
  methods: {
    addTodo() {      
      this.$emit("addTodo", this.newTodoContent, this.makeDay);
      this.newTodoContent = "";
      this.makeDay = "";
    },
  },  
};
</script>

<style lang="scss" scoped></style>
