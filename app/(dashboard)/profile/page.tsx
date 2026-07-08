"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, saveUserFcmToken } from "@/lib/firestore";
import { requestNotificationPermission } from "@/lib/messaging";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const data = await getUserProfile(user.uid);
      setProfile(data);
    }

    loadProfile();
  }, [user]);

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  async function enableNotifications() {
    if (!user) return;

    setLoadingNotifications(true);

    try {
      const token = await requestNotificationPermission();

      if (!token) {
        alert("Не вдалося отримати дозвіл на повідомлення.");
        return;
      }

      await saveUserFcmToken(user.uid, token);

      alert("✅ Повідомлення успішно увімкнено!");
    } catch (e) {
      console.error(e);
      alert("Помилка при ввімкненні повідомлень.");
    } finally {
      setLoadingNotifications(false);
    }
  }

  return (
    <div>
      <h1>👤 Профіль</h1>

      <div
        style={{
          marginTop: 20,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 10,
          maxWidth: 500,
        }}
      >
        <h2>
          {profile?.firstName} {profile?.lastName}
        </h2>

        <p>Email: {user?.email}</p>

        <p>UID: {user?.uid}</p>

        <button
          onClick={enableNotifications}
          disabled={loadingNotifications}
          style={{
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {loadingNotifications
            ? "Увімкнення..."
            : "🔔 Увімкнути повідомлення"}
        </button>

        <br />

        <button onClick={handleLogout}>
          🚪 Вийти
        </button>
      </div>
    </div>
  );
}