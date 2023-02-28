<template>
  <div>
    <div
      :class="{ 'has-background-success-light': todo.done }"
      class="card mb-5"
    >
      <div class="card-content">
        <div class="content">
          <div class="is-flex is-justify-content-space-between">
            <div class="todo-content">
              <div
                v-if="!todo.editing"
                @dblclick="editTodo()"
                class="column"
                :class="{ 'has-text-success line-through': todo.done }"
                title="double click to edit"
              >
                {{ todo.content }}
              </div>
              <base-input
                v-else
                class="editInput"
                v-model="newEdittedValue"
                type="text"
                @blur="doneEdit()"
                @keyup.enter="doneEdit()"
              />
            </div>
            <div
              class="is-flex is-justify-content-space-between is-align-items-center"
            >
              <div class="is-flex is-align-items-center">
                <p class="control">{{ todo.taskDate }}</p>
              </div>
              <base-button
                @click="toggleDone(todo.id)"
                :class="todo.done ? 'is-success' : 'is-light'"
                class="ml-2"
              >
                &check;
              </base-button>
              <base-button @click="deleteTodo()" class="is-danger ml-2">
                &cross;
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["todo"],

  data() {
    return {
      newEdittedValue: "",
    };
  },
  methods: {
    deleteTodo() {
      this.$emit("deleteTodo", this.todo.id); // delete todo
    },
    toggleDone() {
      this.$emit("toggleDone", this.todo.id); // done/in progress flag
    },
    editTodo() {
      this.$emit("editTodo", this.todo); // edit input showing flag
    },
    doneEdit() {
      this.$emit("doneEdit", this.todo, this.newEdittedValue, this.todo.id); // edit todo text
    },
  },
  //заменить на один возвращающий todo
};
</script>

<style lang="scss" scoped>
.line-through {
  text-decoration: line-through;
}
.editInput {
  width: 100%;
}
.todo-content {
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  overflow-wrap: break-word;
}
</style>
