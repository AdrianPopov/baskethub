import { getToken } from "firebase/messaging";
import { messagingPromise } from "./firebase";

export async function requestNotificationPermission() {
  if (typeof window === "undefined") return null;

  try {
    const permission = await Notification.requestPermission();
    console.log("Permission:", permission);

    if (permission !== "granted") {
      alert("Permission: " + permission);
      return null;
    }

    const messaging = await messagingPromise;

    if (!messaging) {
      alert("Messaging not supported");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    console.log("FCM Token:", token);
    alert(token ? "TOKEN OK" : "TOKEN NULL");

    return token;
  } catch (e) {
    console.error(e);
    alert("ERROR: " + String(e));
    return null;
  }
}