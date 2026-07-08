"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { requestNotificationPermission } from "@/lib/messaging";
import { messagingPromise } from "@/lib/firebase";
import { onMessage } from "firebase/messaging";

export default function NotificationProvider() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      console.log("Користувач не авторизований");
      return;
    }

    requestNotificationPermission();

    async function init() {
      const messaging = await messagingPromise;

      if (!messaging) return;

      onMessage(messaging, (payload) => {
        console.log("Push:", payload);

        if (Notification.permission === "granted") {
          new Notification(
            payload.notification?.title || "BasketHub",
            {
              body: payload.notification?.body,
              icon: "/icon-192.png",
            }
          );
        }
      });
    }

    init();
  }, [user, loading]);

  return null;
}