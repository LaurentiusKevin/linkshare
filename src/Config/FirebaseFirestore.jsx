import { firebaseFirestore } from "./Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const storePage = async (uid, page) => {
  return setDoc(doc(firebaseFirestore, "pages", page.url), {
    uid: uid,
    name: page.name,
    description: page.description,
    link: page.link,
    logoImage: page.logoImage,
    backgroundImage: page.backgroundImage,
  });
};

export const getPage = async (page) => {
  try {
    const pageRef = doc(firebaseFirestore, "pages", page);
    // console.log(page);
    return (await getDoc(pageRef)).data();
  } catch (e) {
    console.log("failed to get data: ", e);
  }
};
