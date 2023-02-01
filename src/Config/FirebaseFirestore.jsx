import { firebaseFirestore } from "./Firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";

export const storePage = async (uid, page) => {
  return setDoc(doc(firebaseFirestore, "pages", page.url), {
    url: page.url,
    uid: uid,
    name: page.name,
    description: page.description,
    link: page.link,
    logoImage: page.logoImage,
    backgroundImage: page.backgroundImage,
    totalView: page.totalView ? page.totalView + 1 : 1,
    status: page.status ? page.status : "active",
  });
};

export const getPage = async (page) => {
  try {
    const pageRef = doc(firebaseFirestore, "pages", page);
    return (await getDoc(pageRef)).data();
  } catch (e) {
    console.log("failed to get data: ", e);
  }
};

export const getPagesByUid = async (uid) => {
  try {
    const pageRef = collection(firebaseFirestore, "pages");

    const q = query(pageRef, where("uid", "==", uid));

    return await getDocs(q);
  } catch (e) {
    console.log("failed to get data: ", e);
  }
};

export const getProfile = async (uid) => {
  try {
    const profileRef = doc(firebaseFirestore, "profile", uid);
    return (await getDoc(profileRef)).data();
  } catch (e) {
    console.log("failed to get data: ", e);
  }
};

export const storeProfile = async (profile) => {
  return setDoc(doc(firebaseFirestore, "profile", profile.uid), {
    username: profile.username,
    email: profile.email,
    phoneNumber: profile.phoneNumber ?? "",
    address: profile.address ?? "",
    status: profile.status ?? "active",
  });
};
