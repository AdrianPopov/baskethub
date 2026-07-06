"use client";

import { createUserProfile } from "@/lib/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

const credential = await register(email, password);

await createUserProfile(
  credential.user.uid,
  email,
  firstName,
  lastName
);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Цей email вже використовується.");
      } else if (err.code === "auth/weak-password") {
        setError("Пароль має містити щонайменше 6 символів.");
      } else {
        setError("Помилка реєстрації.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: 320,
        }}
      >
        <h1>Реєстрація</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
         placeholder="Ім'я"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        />

        <input
        placeholder="Прізвище"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Створення..." : "Створити акаунт"}
        </button>
      </form>
    </main>
  );
}