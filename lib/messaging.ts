import { getToken } from "firebase/messaging";
import { messagingPromise } from "./firebase";

export async function requestNotificationPermission() {
  if (typeof window === "undefined") return null;

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    console.log("Дозвіл на сповіщення не надано");
    return null;
  }

  const messaging = await messagingPromise;

  if (!messaging) {
    console.log("Firebase Messaging не підтримується");
    return null;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    console.log("FCM Token:", token);

    return token;
  } catch (error) {
    console.error("Помилка отримання FCM токена:", error);
    return null;
  }
}