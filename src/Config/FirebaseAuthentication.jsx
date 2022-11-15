import { firebaseAuthentication } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const authRegister = async ({ email, password }) => {
  return createUserWithEmailAndPassword(
    firebaseAuthentication,
    email,
    password
  );
};

export const authSignIn = async ({ email, password }) => {
  return signInWithEmailAndPassword(firebaseAuthentication, email, password);
};

export const authSignOut = async () => {
  return signOut(firebaseAuthentication);
};
