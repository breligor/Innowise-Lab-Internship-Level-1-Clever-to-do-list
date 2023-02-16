<template>
  <calendarComponent
    class="calendar"
    @getDate="filteredByDateTasks"
    :todos="todos"
  ></calendarComponent>
  <main>    
    <div class="wrapperTodo">
      <div class="btnWrapper">
        <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
      </div>
      <div class="title has-text-centered">WHAT's TODO</div>

      <form @submit.prevent="addTodo">
        <div class="field is-grouped mb-5">
          <p class="control is-expanded">
            <input
              v-model="newTodoContent"
              class="input"
              type="text"
              placeholder="Add a todo..."
            />
          </p>
          <p class="control">
            <input class="input" type="date" v-model="makeDay" required />
          </p>
          <p class="control">
            <button :disabled="!newTodoContent" class="button is-info">
              Add
            </button>
          </p>
        </div>
      </form>
      <div class="todoInfo block is-flex is-justify-content-space-between">
        <div class="todoQuantity block">
          {{ "Количество заданий: " + todosForRender.length }}
        </div>
        <div class="btnShowAllTasksWrapper">
          <button @click="showAllTasks" class="button is-info ml-2">
            show all
          </button>
        </div>
      </div>
      <div class="todo-item-wrapper-scroll">
        <div class="todo-item-wrapper">
          <div
            :class="{ 'has-background-success-light': todo.done }"
            class="card mb-5"
            v-for="todo in todosForRender"
            :key="todo.id"
          >
            <div class="card-content">
              <div class="content">
                <div class="is-flex is-justify-content-space-between">
                  <div class="todo-content">
                    <div
                      v-if="!todo.editing"
                      @dblclick="editTodo(todo)"
                      class="column"
                      :class="{ 'has-text-success line-through': todo.done }"
                      title="double click to edit"
                    >
                      {{ todo.content }}
                    </div>
                    <input
                      v-else
                      class="input editInput"
                      v-model="todo.content"
                      type="text"
                      @blur="doneEdit(todo, todo.id)"
                      @keyup.enter="doneEdit(todo, todo.id)"
                    />
                  </div>

                  <div
                    class="is-flex is-justify-content-space-between is-align-items-center"
                  >
                    <div class="is-flex is-align-items-center">
                      <p class="control">{{ todo.taskDate }}</p>
                    </div>
                    <button
                      @click="toggleDone(todo.id)"
                      :class="todo.done ? 'is-success' : 'is-light'"
                      class="button ml-2"
                    >
                      &check;
                    </button>
                    <button
                      @click="deleteTodo(todo.id)"
                      class="button is-danger ml-2"
                    >
                      &cross;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import calendarComponent from "@/components/calendarComponent.vue";
import { ref, onMounted } from "vue";
import { dbStore } from "@/firebaseApp";
import { auth } from "@/firebaseApp";
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
import { isLoggedIn } from "@/App";

const user = auth.currentUser;
const userId = user.uid;
const todos = ref([]);
const todosForRender = ref([]);
const newTodoContent = ref("");
const todosCollectionRef = collection(dbStore, `${userId}`);
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));
const makeDay = ref("");

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
    userId: userId,
    mail: user.email,
    editing: false,
    taskDate: makeDay.value,
  });
  newTodoContent.value = ""; 
  console.log(makeDay.value);
  makeDay.value = "";
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
});

//del btn
const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));  
};

//update
const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id); 

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done,
  });
};

//editing
const editTodo = (todo) => {
  todo.editing = true;
};

const doneEdit = (todo, id) => {
  todo.editing = false;
  const index = todos.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(todosCollectionRef, id), {
    content: todos.value[index].content,
  });
};

// получаем дату дня из компонента Calendar для фильтрации тасок по дню и фильтруем массив по которому рендерим
const filteredByDateTasks = (chosenDate) => {
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
  padding-top: 50px;
}
.wrapperTodo {
  width: 100%;
  max-width: 800px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
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
.makeDate {
  width: 110px;
  border: none;
  outline: none;
  box-shadow: none;
}
.todo-item-wrapper-scroll {
  overflow-y: auto;
  max-height: 600px;
}
.calendar {
  height: 200px;
}
</style>
