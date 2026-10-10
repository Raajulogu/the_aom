"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "staff" | "customer";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  avatar: string;
  customerId?: string;
  customerName?: string;
  branchCount?: number;
}

export const TEST_ACCOUNTS: Record<string, AuthUser & { password: string }> = {
  "admin@aomlaundry.in": {
    id: "user-admin-1",
    name: "Rajesh Kumar",
    email: "admin@aomlaundry.in",
    password: "admin123",
    role: "admin",
    title: "System Administrator",
    avatar: "R",
  },
  "staff@aomlaundry.in": {
    id: "user-staff-1",
    name: "Arun Pandian",
    email: "staff@aomlaundry.in",
    password: "staff123",
    role: "staff",
    title: "Operations Supervisor",
    avatar: "A",
  },
  "customer@hotelgranda.in": {
    id: "user-cust-1",
    name: "Suresh Babu",
    email: "customer@hotelgranda.in",
    password: "hotel123",
    role: "customer",
    title: "General Manager",
    avatar: "S",
    customerId: "hotel-grand-a",
    customerName: "Hotel Grand A",
    branchCount: 2,
  },
  // Alias for hotel operations email
  "ops@hotelgranda.in": {
    id: "user-cust-1",
    name: "Suresh Babu",
    email: "ops@hotelgranda.in",
    password: "hotel123",
    role: "customer",
    title: "General Manager",
    avatar: "S",
    customerId: "hotel-grand-a",
    customerName: "Hotel Grand A",
    branchCount: 2,
  },
};

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => { success: boolean; error?: string };
  quickLogin: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "aom_auth_user";
const COOKIE_NAME = "aom_session";

function setSessionCookie(user: AuthUser | null) {
  if (typeof document === "undefined") return;
  if (!user) {
    document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  } else {
    const data = encodeURIComponent(JSON.stringify({ id: user.id, email: user.email, role: user.role }));
    document.cookie = `${COOKIE_NAME}=${data}; path=/; max-age=86400; SameSite=Lax`;
  }
}

function getInitialUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as AuthUser;
      setSessionCookie(parsed);
      return parsed;
    }
  } catch {
    // Ignore storage parse error
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);
  const [isLoading] = useState(false);
  const router = useRouter();

  const login = (email: string, password?: string): { success: boolean; error?: string } => {
    const trimmed = email.trim().toLowerCase();
    const account = TEST_ACCOUNTS[trimmed];

    if (!account) {
      return {
        success: false,
        error: "Invalid email. Please use one of the test emails: admin@aomlaundry.in, staff@aomlaundry.in, or customer@hotelgranda.in",
      };
    }

    if (password && password !== account.password && password !== "demo") {
      return {
        success: false,
        error: `Incorrect password. Use '${account.password}' or click a Quick Login button.`,
      };
    }

    const { password: _pwd, ...userData } = account;
    void _pwd;
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    setSessionCookie(userData);

    // Redirect to respective portal home
    if (userData.role === "admin") {
      router.push("/");
    } else if (userData.role === "staff") {
      router.push("/employee");
    } else if (userData.role === "customer") {
      router.push("/portal");
    }

    return { success: true };
  };

  const quickLogin = (targetRole: UserRole) => {
    let email = "admin@aomlaundry.in";
    if (targetRole === "staff") email = "staff@aomlaundry.in";
    if (targetRole === "customer") email = "customer@hotelgranda.in";
    login(email, TEST_ACCOUNTS[email]?.password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    setSessionCookie(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        isLoading,
        login,
        quickLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
