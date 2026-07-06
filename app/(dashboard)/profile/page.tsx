"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile } from "@/lib/firestore";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);

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

        <button onClick={handleLogout}>
          🚪 Вийти
        </button>
      </div>
    </div>
  );
}