"use client";

import { useEffect, useState } from "react";
import { getUserRole } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { createMatch } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminPage() {
  const { user } = useAuth();

  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

const router = useRouter();
const [isAdmin, setIsAdmin] = useState(false);
const [checking, setChecking] = useState(true);

useEffect(() => {
  async function checkRole() {
    if (!user) return;

    const role = await getUserRole(user.uid);

    if (role !== "admin") {
      router.replace("/dashboard");
      return;
    }

    setIsAdmin(true);
    setChecking(false);
  }

  checkRole();
}, [user, router]);

if (checking) {
  return <p>Перевірка доступу...</p>;
}

if (!isAdmin) {
  return null;
}

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!user) return;

  await createMatch({
    homeTeam,
    awayTeam,
    homeScore: 0,
    awayScore: 0,
    status: "upcoming",
    location,
    date: new Date(date).getTime(),
    createdBy: user.uid,
  });

  await fetch("/api/send-notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "🏀 Новий матч!",
      body: `${homeTeam} — ${awayTeam}\n📍 ${location}`,
    }),
  });

  setHomeTeam("");
  setAwayTeam("");
  setLocation("");
  setDate("");

  alert("Матч створено!");
}

  return (
    <div>
      <h1>Створити матч</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 400,
        }}
      >
        <input
          placeholder="Домашня команда"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          required
        />

        <input
          placeholder="Гостьова команда"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          required
        />

        <input
          placeholder="Місце проведення"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">
          Створити матч
        </button>
      </form>
    </div>
  );
}