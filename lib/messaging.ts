import { auth, db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getToken } from "firebase/messaging";
import { messagingPromise } from "./firebase";

export async function requestNotificationPermission() {
  console.log("NotificationProvider запущений");

  if (typeof window === "undefined") return null;

  console.log("Permission:", Notification.permission);

  const permission = await Notification.requestPermission();

  console.log("Після запиту:", permission);

  if (permission !== "granted") {
    console.log("Дозвіл не надано");
    return null;
  }

  const messaging = await messagingPromise;

  console.log("Messaging:", messaging);

  if (!messaging) {
    console.log("Messaging не підтримується");
    return null;
  }

  try {
    console.log("Отримую токен...");

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    console.log("FCM Token:", token);

    const user = auth.currentUser;

    if (user && token) {
      await updateDoc(doc(db, "users", user.uid), {
        fcmToken: token,
      });
    }

    return token;
  } catch (error) {
    console.error("getToken error:", error);
    return null;
  }
}