"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { requestNotificationPermission } from "@/lib/messaging";

export default function NotificationProvider() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    requestNotificationPermission();
  }, [user]);

  return null;
}