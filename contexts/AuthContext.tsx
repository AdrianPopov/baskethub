"use client";

import { requestNotificationPermission } from "@/lib/messaging";
import { saveUserFcmToken } from "@/lib/firestore";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "@/lib/firebase";
import { getUserRole } from "@/lib/firestore";

type Role = "admin" | "player";

type AuthContextType = {
  user: User | null;
  role: Role | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  alert(
    currentUser
      ? "Увійшов: " + currentUser.email
      : "Користувач NULL"
  );

     if (currentUser) {
  const userRole = await getUserRole(currentUser.uid);
  setRole(userRole as Role);

  const token = await requestNotificationPermission();

  if (token) {
    await saveUserFcmToken(currentUser.uid, token);
  }
} else {
        setRole(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);