import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { createNewTodolist } from "./firebase_utils";

export const loginEmailPassword = async (email, password) =>
  await signInWithEmailAndPassword(auth, email, password);

export const registerEmailPassword = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  createNewTodolist({ title: "My first todolist" });
};
