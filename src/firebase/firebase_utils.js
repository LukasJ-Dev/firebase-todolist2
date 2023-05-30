import { auth, firebaseDatabase } from "./firebase";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const todolistCollection = collection(firebaseDatabase, "todolists");
const taskCollection = collection(firebaseDatabase, "tasks");

export const getTodolists = async () => {
  if (auth.currentUser) {
    const q = query(
      todolistCollection,
      where("owner", "==", auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const todolists = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
    }));
    return todolists;
  }
};

export const getTasks = async (todolistId) => {
  if (auth.currentUser) {
    const q = query(taskCollection, where("todolist", "==", todolistId));
    const querySnapshot = await getDocs(q);

    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      checked: doc.data().checked,
      description: doc.data().description,
    }));
    return tasks;
  }
};

export const createNewTask = async (name, todolist) => {
  const newTask = await addDoc(taskCollection, {
    name: name,
    todolist: todolist,
  });
  return {
    name: name,
    checked: false,
    todolist: todolist,
    description: "",
    id: newTask.id,
  };
};

export const createNewTodolist = async ({ title }) => {
  const newTodolist = await addDoc(todolistCollection, {
    title: title,
    owner: auth.currentUser.uid,
  });
  return {
    title: title,
    owner: auth.currentUser.uid,
    id: newTodolist.id,
  };
};

export const markAllTasks = async (id) => {
  const q = query(taskCollection, where("todolist", "==", id));

  const querySnapshot = await getDocs(q);

  querySnapshot.docs.forEach(async (doc) => {
    await updateDoc(doc.ref, {
      checked: true,
    });
  });
};

export const deleteAllMarkedTasks = async (id) => {
  const q = query(
    taskCollection,
    where("todolist", "==", id),
    where("checked", "==", true)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.docs.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};

export const deleteTodolistFirebase = async (id) => {
  const q = query(taskCollection, where("todolist", "==", id));

  const querySnapshot = await getDocs(q);

  querySnapshot.docs.forEach((doc) => {
    deleteDoc(doc.ref);
  });
  await deleteDoc(doc(firebaseDatabase, "todolists", id));
  return id;
};

export const deleteTaskFirebase = async (id) => {
  await deleteDoc(doc(firebaseDatabase, "tasks", id));
  return id;
};

export const editTodolist = async (id, title) => {
  await updateDoc(doc(firebaseDatabase, "todolists", id), {
    title: title,
  });
  return {
    id: id,
    title: title,
  };
};

export const checkTask = async (id, checked) => {
  await updateDoc(doc(firebaseDatabase, "tasks", id), {
    checked: checked,
  });
  return {
    id: id,
    checked: checked,
  };
};

export const editTask = async (id, editedTask) => {
  await updateDoc(doc(firebaseDatabase, "tasks", id), editedTask);
  return editedTask;
};
