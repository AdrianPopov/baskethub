"use client";

import Link from "next/link";
import AttendanceButtons from "@/components/AttendanceButtons";
import { useEffect, useState } from "react";
import { deleteMatch, getMatches } from "@/lib/firestore";
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
    <div
      style={{
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: 30,
          marginBottom: 20,
        }}
      >
        🏀 Матчі
      </h1>

      {matches.length === 0 ? (
        <p>Матчів поки немає.</p>
      ) : (
        matches.map((match) => (
          <Link
            key={match.id}
            href={`/matches/${match.id}`}
            style={{
              display: "block",
              color: "inherit",
              textDecoration: "none",
              marginBottom: 18,
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: 20,
                boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                transition: ".2s",
              }}
            >
              <h2
                style={{
                  marginBottom: 12,
                  fontSize: 22,
                }}
              >
                {match.homeTeam} — {match.awayTeam}
              </h2>

              <div style={{ lineHeight: 1.8 }}>
                <div>📍 {match.location}</div>

                <div>
                  📅 {new Date(match.date).toLocaleString()}
                </div>

                
                 <div>
  🏁 Статус: {match.status}
</div>
                

                <div>
                  🏁 Статус: {match.status}
                </div>
              </div>

              <div
                style={{
                  marginTop: 18,
                }}
                onClick={(e) => e.preventDefault()}
              >
                <AttendanceButtons matchId={match.id} />
              </div>

              {role === "admin" && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(match.id);
                  }}
                  style={{
                    marginTop: 16,
                    width: "100%",
                    padding: 14,
                    border: "none",
                    borderRadius: 12,
                    background: "#ef4444",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  🗑️ Видалити матч
                </button>
              )}
            </div>
          </Link>
        ))
      )}
    </div>
  );
}