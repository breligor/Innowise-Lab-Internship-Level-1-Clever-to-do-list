import { useFirebaseApi } from "@/composables/useFirebaseApi";
import {
  collection,
  addDoc,
  orderBy,
  query,  
} from "@firebase/firestore";

const { auth, dbStore } = useFirebaseApi();

export function useAddDocToFirebase() {
  const user = auth.currentUser;
  const userId = user.uid;
  const todosCollectionRef = collection(dbStore, `${userId}`);

  const addTodo = (todoText, todoDate) => {
    addDoc(todosCollectionRef, {
      content: todoText,
      done: false,
      date: Date.now(),
      userId: userId,
      mail: user.email,
      editing: false,
      taskDate: todoDate,
    });
  };
  const todosCollectionQuery = query(
    todosCollectionRef,
    orderBy("date", "desc")
  );

  return {
    addTodo,
    todosCollectionQuery,
    todosCollectionRef,
    userId,
    user,    
  };
}
