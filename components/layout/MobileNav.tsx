"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    icon: "🏠",
    label: "Головна",
  },
  {
    href: "/matches",
    icon: "🏀",
    label: "Матчі",
  },
  {
    href: "/admin",
    icon: "➕",
    label: "Створити",
  },
  {
    href: "/profile",
    icon: "👤",
    label: "Профіль",
  },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        background: "#111827",
        display: window.innerWidth > 768 ? "none" : "flex",
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
            color:
              pathname === link.href
                ? "#60a5fa"
                : "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 13,
          }}
        >
          <span style={{ fontSize: 22 }}>
            {link.icon}
          </span>

          {link.label}
        </Link>
      ))}
    </nav>
  );
}