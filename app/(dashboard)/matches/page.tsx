"use client";

import Link from "next/link";
import AttendanceButtons from "@/components/AttendanceButtons";
import { useEffect, useState } from "react";
import {
  deleteMatch,
  getMatches,
} from "@/lib/firestore";
import { Match } from "@/types/match";
import { useAuth } from "@/contexts/AuthContext";

export default function MatchesPage() {
  const { role } = useAuth();

  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    const data = await getMatches();
    setMatches(data);
  }

  async function handleDelete(id: string) {
    if (!confirm("Видалити матч?")) return;

    await deleteMatch(id);
    loadMatches();
  }

  return (
  <div>
    <h1>🏀 Матчі</h1>

    {matches.length === 0 ? (
      <p>Матчів поки немає.</p>
    ) : (
      matches.map((match) => (
        <Link
          key={match.id}
          href={`/matches/${match.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "block",
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              padding: 16,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <h3>
              {match.homeTeam} — {match.awayTeam}
            </h3>

            <p>📍 {match.location}</p>

            <p>
              📅 {new Date(match.date).toLocaleString()}
            </p>

            <AttendanceButtons matchId={match.id} />

            {role === "admin" && (
              <button
                onClick={(e) => {
                  e.preventDefault(); // щоб не відкривалась сторінка матчу
                  handleDelete(match.id);
                }}
                style={{
                  marginTop: 10,
                  cursor: "pointer",
                }}
              >
                🗑️ Видалити
              </button>
            )}
          </div>
        </Link>
      ))
    )}
  </div>
);
}