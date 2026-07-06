import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";

import { db } from "./firebase";
import { Match } from "@/types/match";

const matchesRef = collection(db, "matches");

export async function createMatch(match: Omit<Match, "id">) {
  return addDoc(matchesRef, match);
}

export async function getMatches() {
  const q = query(matchesRef, orderBy("date", "desc"));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Match[];
}

export async function getMatch(id: string) {
  const snapshot = await getDoc(doc(db, "matches", id));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Match;
}

export async function deleteMatch(id: string) {
  return deleteDoc(doc(db, "matches", id));
}

export async function createUserProfile(
  uid: string,
  email: string,
  firstName: string,
  lastName: string
) {
  return setDoc(doc(db, "users", uid), {
    email,
    firstName,
    lastName,
    role: "player",
    createdAt: Date.now(),
  });
}

export async function getUserProfile(uid: string) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) return null;

  return snapshot.data();
}

export async function getUserRole(uid: string) {
  const snapshot = await getDoc(doc(db, "users", uid));

  if (!snapshot.exists()) return null;

  return snapshot.data().role as "admin" | "player";
}