"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile } from "@/lib/firestore";
import { setAttendance } from "@/lib/attendance";

type Props = {
  matchId: string;
};

export default function AttendanceButtons({
  matchId,
}: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function answer(status: "yes" | "no") {
    if (!user) return;

    setLoading(true);

    const profile = await getUserProfile(user.uid);

    if (!profile) {
      setLoading(false);
      return;
    }

    await setAttendance(matchId, {
      userId: user.uid,
      firstName: profile.firstName,
      lastName: profile.lastName,
      status,
    });

    setLoading(false);

    window.location.reload();
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginTop: 12,
      }}
    >
      <button
        disabled={loading}
        onClick={() => answer("yes")}
      >
        ✅ Буду
      </button>

      <button
        disabled={loading}
        onClick={() => answer("no")}
      >
        ❌ Не буду
      </button>
    </div>
  );
}