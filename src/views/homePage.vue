<template>
  <calendarComponent
    @getDate="filteredTasksByDate"
    :todos="todos"
  ></calendarComponent>
  <main>
    <base-toast-transition>
      <base-toast class="toast" @closeToast="closeToast()" v-if="errMessage">
        {{ errMessage }}
      </base-toast>
    </base-toast-transition>
    <div class="wrapperTodo">
      <div class="title has-text-centered">WHAT's TODO</div>

      <todoForm @addTodo="sendTodoToFirebase" />

      <div class="todoInfo block is-flex is-justify-content-space-between">
        <div class="todoQuantity block">
          {{ "Количество заданий: " + todosForRender.length }}
        </div>
        <div>
          <base-button @click="showAllTasks()" class="is-info">
            show all
          </base-button>
        </div>
      </div>
      <div class="todo-item-wrapper-scroll">
        <todoItem
          :todo="todo"
          @deleteTodo="deleteTodo"
          @toggleDone="toggleDone"
          @editTodo="editTodo"
          @doneEdit="doneEdit"
          v-for="todo in todosForRender"
          :key="todo.id"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import todoItem from "@/components/todoItem.vue";
import todoForm from "@/components/todoForm.vue";
import calendarComponent from "@/components/calendarComponent.vue";
import { onMounted } from "vue";
import { doc, deleteDoc, updateDoc } from "@firebase/firestore";
import { useNotification } from "@/composables/useNotification";
import { useAddDocToFirebase } from "@/composables/useAddDocToFirebase";
import { useRealTimeUpdateFB } from "@/composables/useRealTimeUpdateFB";

const { errMessage } = useNotification();
const { addTodo, todosCollectionRef } = useAddDocToFirebase();
const { unsub, todos, todosForRender } = useRealTimeUpdateFB();

//useAddDocToFirebase()  add new todo to FB collection
const sendTodoToFirebase = (text, data) => {
  addTodo(text, data);
};

//useRealTimeUpdateFB() listen to changes and return data (todosForRender) for rendering
onMounted(() => {
  unsub();
});

//del todo
const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
};

//done/in-progress btn
const toggleDone = (id) => {
  const index = todosForRender.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todosForRender.value[index].done,
  });
};

//todo editing by dbl click and update with new value
const editTodo = (todo) => {
  todo.editing = true;
};

const doneEdit = (todo, newContent, id) => {
  todo.content = newContent;
  todo.editing = false;
  const index = todosForRender.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(todosCollectionRef, id), {
    content: todosForRender.value[index].content,
  });
};

// get day from Calendar component to filter tasks with selected date 
const filteredTasksByDate = (chosenDate) => {
  todosForRender.value = todos.value.filter((it) => it.taskDate === chosenDate);
};

// show all user's tasks
const showAllTasks = () => {
  todosForRender.value = todos.value;
};
</script>

<style lang="scss" scoped>
@import "bulma/css/bulma.min.css";
main {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding-top: 10px;
}
.wrapperTodo {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.toast {
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.todo-item-wrapper-scroll {
  overflow-y: auto;
  max-height: 600px;
}
</style>
