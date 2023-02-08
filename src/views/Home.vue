<template>
  <div class="wrapperTodo">
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
          <button :disabled="!newTodoContent" class="button is-info">
            Add
          </button>
        </p>
      </div>
    </form>

    <div
      :class="{ 'has-background-success-light': todo.done }"
      class="card mb-5"
      v-for="todo in todos"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-3 had-text-right">
              <button
                @click="toggleDone(todo.id)"
                :class="todo.done ? 'is-success' : 'is-light'"
                class="button"
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { dbStore } from "@/main";
import {
  doc,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
} from "@firebase/firestore";

const todos = ref([]);
const todosCollectionRef = collection(dbStore, "todos");
const newTodoContent = ref("");

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
  });
  newTodoContent.value = "";
};

//get todos
//onMounted(async () => {
//   const querySnapshot = await getDocs(collection(dbStore, "todos"));
//   let fbTodos = []
// querySnapshot.forEach((doc) => {
//    console.log(doc.id, " => ", doc.data());
//    const todo = {
//     id: doc.id,
//     content: doc.data().content,
//     done: doc.data().done
//    }
//    fbTodos.push(todo)
// });
// });
// });

//update todos
onMounted(() => {
  onSnapshot(todosCollectionRef, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

//del btn
const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
  //todos.value = todos.value.filter((todo) => todo.id !== id);
};

//update
const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  //todos.value[index].done = !todos.value[index].done;

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done,
  });
};
</script>

<style>
@import "bulma/css/bulma.min.css";
.wrapperTodo {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.line-through {
  text-decoration: line-through;
}
</style>
