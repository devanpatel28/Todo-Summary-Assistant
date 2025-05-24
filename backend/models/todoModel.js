import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const addTodo = async (title) => {
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title,
      createdAt: new Date(),
    });
    return { id: docRef.id, title };
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const getTodos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await deleteDoc(doc(db, "todos", id));
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};