import { useAddDocToFirebase } from "@/composables/useAddDocToFirebase";
import { onSnapshot } from "@firebase/firestore";
import { ref } from "vue";

const { todosCollectionQuery, userId, user } = useAddDocToFirebase();

export function useRealTimeUpdateFB() {
  const todos = ref([]); // all user's todos (show all button)
  const todosForRender = ref([]); //array to render

  //real time update - get snapshot from FB after any local changes
  const unsub = () => {
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
  };

  return {
    unsub,
    todos,
    todosForRender,
  };
}
