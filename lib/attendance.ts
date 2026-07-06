import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase";
import { Attendance } from "@/types/attendance";

const attendanceRef = collection(db, "attendance");

export async function setAttendance(
  matchId: string,
  attendance: Attendance
) {
  const q = query(
    attendanceRef,
    where("matchId", "==", matchId),
    where("userId", "==", attendance.userId)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return addDoc(attendanceRef, {
      matchId,
      ...attendance,
    });
  }

  const attendanceDoc = snapshot.docs[0];

  return updateDoc(doc(db, "attendance", attendanceDoc.id), {
    status: attendance.status,
  });
}

export async function getAttendance(matchId: string) {
  const q = query(
    attendanceRef,
    where("matchId", "==", matchId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function removeAttendance(
  attendanceId: string
) {
  return deleteDoc(doc(db, "attendance", attendanceId));
}