import Sidebar from "@/components/layout/Sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: 30,
          }}
        >
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}