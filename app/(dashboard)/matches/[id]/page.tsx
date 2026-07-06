"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getMatch } from "@/lib/firestore";
import { getAttendance } from "@/lib/attendance";

import { Match } from "@/types/match";
import AttendanceButtons from "@/components/AttendanceButtons";

type Attendance = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  status: "yes" | "no";
};

export default function MatchPage() {
  const { id } = useParams();

  const [match, setMatch] = useState<Match | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    const matchData = await getMatch(id as string);

    if (!matchData) {
      setLoading(false);
      return;
    }

    setMatch(matchData);

    const attendanceData = await getAttendance(id as string);
    setAttendance(attendanceData as Attendance[]);

    setLoading(false);
  }

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (!match) {
    return <p>Матч не знайдено.</p>;
  }

  const yes = attendance.filter((a) => a.status === "yes");
  const no = attendance.filter((a) => a.status === "no");

  return (
    <div style={{ maxWidth: 700 }}>
      <h1>
        🏀 {match.homeTeam} — {match.awayTeam}
      </h1>

      <p>📍 {match.location}</p>

      <p>
        📅 {new Date(match.date).toLocaleString()}
      </p>

      <AttendanceButtons matchId={match.id} />

      <hr style={{ margin: "20px 0" }} />

      <h2>✅ Будуть ({yes.length})</h2>

      {yes.length === 0 ? (
        <p>Поки ніхто не підтвердив.</p>
      ) : (
        yes.map((player) => (
          <p key={player.id}>
            {player.firstName} {player.lastName}
          </p>
        ))
      )}

      <hr style={{ margin: "20px 0" }} />

      <h2>❌ Не будуть ({no.length})</h2>

      {no.length === 0 ? (
        <p>Поки ніхто не відмовився.</p>
      ) : (
        no.map((player) => (
          <p key={player.id}>
            {player.firstName} {player.lastName}
          </p>
        ))
      )}
    </div>
  );
}