import { firebaseAuthentication } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  getAuth,
} from "firebase/auth";
import nookies from "nookies";

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

export const getCurrentUser = (context) => {
  let data = nookies.get(context, { path: "/" }).user;

  if (data === undefined) {
    return null;
  }

  return JSON.parse(data);
};

export const changePassword = ({ email, oldPassword, newPassword }) => {
  return authSignIn({ email: email, password: oldPassword }).then(
    (responseValidatePassword) => {
      return updatePassword(getAuth().currentUser, newPassword);
    }
  );
};
