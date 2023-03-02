import { useFirebaseApi } from "@/composables/useFirebaseApi";
import {
  collection,
  addDoc,
  orderBy,
  doc,
  query,
  deleteDoc,  
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

  const deleteTodo = (id) => {
    deleteDoc(doc(todosCollectionRef, id));
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
    deleteTodo, 
  };
}
