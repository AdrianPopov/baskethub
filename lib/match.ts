import {
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./firebase";

export async function saveMatch(data: any) {
  await setDoc(doc(db, "config", "match"), data);
}

export function listenMatch(callback: any) {
  return onSnapshot(doc(db, "config", "match"), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  });
}