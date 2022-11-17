import { firebaseFirestore } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";

export const storePage = async (uid, page) => {
  return setDoc(doc(firebaseFirestore, "pages", page.url), {
    uid: uid,
    name: page.name,
    description: page.description,
    link: page.link,
  });
};
