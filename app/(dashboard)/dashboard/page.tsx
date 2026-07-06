"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>🏀 Dashboard</h1>

      <p>
        Користувач:
        {" "}
        {user?.email}
      </p>
    </main>
  );
}