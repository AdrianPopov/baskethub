"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const links = [
    { href: "/dashboard", icon: "🏠", label: "Головна" },
    { href: "/matches", icon: "🏀", label: "Матчі" },
    { href: "/profile", icon: "👤", label: "Профіль" },
    { href: "/settings", icon: "⚙️", label: "Налаштування" },
  ];

  if (role === "admin") {
    links.splice(2, 0, {
      href: "/admin",
      icon: "➕",
      label: "Створити",
    });
  }

  if (mobile) {
    return (
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 70,
          background: "#111827",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          borderTop: "1px solid #374151",
          zIndex: 1000,
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color: pathname === link.href ? "#60a5fa" : "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <span style={{ fontSize: 22 }}>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    );
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
      <h2 style={{ marginBottom: 30 }}>🏀 BasketHub</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color: pathname === link.href ? "#60a5fa" : "white",
              fontSize: 17,
            }}
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}