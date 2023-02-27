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

      <todoForm @addTodo="addTodo" :newTodoContent="newTodoContent" />
      
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
import { ref, onMounted } from "vue";
import { useFirebaseApi } from "@/composables/useFirebaseApi";
import {
  doc,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "@firebase/firestore";
import { useNotification } from "@/composables/useNotification";

const { errMessage, closeToast, autoHideToast, showToastWithDelay } =
  useNotification();
const { auth, dbStore } = useFirebaseApi();
const user = auth.currentUser;
const userId = user.uid;
const todos = ref([]);
const todosForRender = ref([]); //array to filter
const todosCollectionRef = collection(dbStore, `${userId}`);
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

const addTodo = (newTodoContent, makeDay) => {
  addDoc(todosCollectionRef, {
    content: newTodoContent,
    done: false,
    date: Date.now(),
    userId: userId,
    mail: user.email,
    editing: false,
    taskDate: makeDay,
  });
  newTodoContent = "";
  makeDay = "";
};

//подписка FB
onMounted(() => {
  onSnapshot(todosCollectionQuery, (querySnapshot) => {
    const fbTodos = [];

    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
        userId: userId,
        mail: user.email,
        editing: false,
        taskDate: new Date(doc.data().taskDate).toLocaleDateString(),
      };
      fbTodos.push(todo);
    });

    todos.value = fbTodos;
    todosForRender.value = fbTodos;
  });
  showToastWithDelay("Succesfully signed in");
  autoHideToast(errMessage.value);
});

//del btn
const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
};

//update
const toggleDone = (id) => {
  const index = todosForRender.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todosForRender.value[index].done,
  });
};

//editing
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

// получаем дату дня из компонента Calendar для фильтрации тасок по дню и фильтруем массив по которому рендерим
const filteredTasksByDate = (chosenDate) => {
  todosForRender.value = todos.value.filter((it) => it.taskDate === chosenDate);
};

// показать все таски пользователя за все дни
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
