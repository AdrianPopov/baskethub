"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  const links = [
    { href: "/profile", label: "👤 Профіль" },
    { href: "/dashboard", label: "🏠 Dashboard" },
    { href: "/matches", label: "🏀 Матчі" },
    { href: "/settings", label: "⚙️ Налаштування" },
  ];

  if (role === "admin") {
    links.splice(2, 0, {
      href: "/admin",
      label: "➕ Створити матч",
    });
  }

  return (
    <aside
      style={{
        width: 250,
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: 20,
      }}
    >
      <h2 style={{ marginBottom: 30 }}>🏀 Basketball</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color:
                pathname === link.href
                  ? "#60a5fa"
                  : "white",
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}