import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import NotificationProvider from "@/components/NotificationProvider";

export const metadata: Metadata = {
  title: "BasketHub",
  description: "Basketball management application",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <AuthProvider>
          <NotificationProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}