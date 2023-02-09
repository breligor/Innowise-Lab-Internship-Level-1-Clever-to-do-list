<template>
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
            <button :disabled="!newTodoContent" class="button is-info">
              Add
            </button>
          </p>
        </div>
      </form>
      <div class="todo-item-wrapper">
        <div
          :class="{ 'has-background-success-light': todo.done }"
          class="card mb-5"
          v-for="todo in todos"
        >
          <div class="card-content">
            <div class="content">
              <div class="is-flex is-justify-content-space-between">
                <div class="is-flex">
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
                    class="input"
                    v-model="todo.content"
                    type="text"
                    @blur="doneEdit(todo, todo.id)"
                    @keyup.enter="doneEdit(todo, todo.id)"
                  />
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
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { dbStore } from "@/main";
import { getAuth } from "firebase/auth";
import {
  doc,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "@firebase/firestore";

const auth = getAuth();
const user = auth.currentUser;
const userId = user.uid;
const todos = ref([]);
const newTodoContent = ref("");
const todosCollectionRef = collection(dbStore, `${userId}`);
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
    userId: userId,
    mail: user.email,
    editing: false,
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
</script>

<style>
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
  max-width: 600px;
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.line-through {
  text-decoration: line-through;
}
.todo-item-wrapper {
  min-height: 70%vh;
  overflow: hidden;
}
</style>
