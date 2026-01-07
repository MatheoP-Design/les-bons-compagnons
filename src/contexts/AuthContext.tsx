import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "particulier" | "cadre";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  role: UserRole;
  points_fidelite: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    userData: Omit<User, "id" | "points_fidelite"> & { password: string }
  ) => Promise<boolean>;
  logout: () => void;
  addPoints: (points: number) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const mockUsers = [
      // Particuliers
      {
        id: "user1",
        email: "sophie@example.com",
        password: "123456",
        firstName: "Sophie",
        lastName: "Bernard",
        phone: "06 12 34 56 78",
        city: "Lyon",
        role: "particulier" as UserRole,
        points_fidelite: 0,
      },
      {
        id: "user2",
        email: "pierre@example.com",
        password: "123456",
        firstName: "Pierre",
        lastName: "Martin",
        phone: "06 23 45 67 89",
        city: "Paris",
        role: "particulier" as UserRole,
        points_fidelite: 0,
      },
      {
        id: "user3",
        email: "marie@example.com",
        password: "123456",
        firstName: "Marie",
        lastName: "Dubois",
        phone: "06 34 56 78 90",
        city: "Bordeaux",
        role: "particulier" as UserRole,
        points_fidelite: 0,
      },
      {
        id: "user4",
        email: "lucas@example.com",
        password: "123456",
        firstName: "Lucas",
        lastName: "Moreau",
        phone: "06 45 67 89 01",
        city: "Toulouse",
        role: "particulier" as UserRole,
        points_fidelite: 0,
      },
      // Cadres
      {
        id: "cadre1",
        email: "jean@compagnons.fr",
        password: "123456",
        firstName: "Jean",
        lastName: "Dupont",
        phone: "06 11 22 33 44",
        city: "Lyon",
        role: "cadre" as UserRole,
        points_fidelite: 0,
      },
      {
        id: "cadre2",
        email: "paul@compagnons.fr",
        password: "123456",
        firstName: "Paul",
        lastName: "Lefebvre",
        phone: "06 22 33 44 55",
        city: "Paris",
        role: "cadre" as UserRole,
        points_fidelite: 0,
      },
      {
        id: "cadre3",
        email: "michel@compagnons.fr",
        password: "123456",
        firstName: "Michel",
        lastName: "Garnier",
        phone: "06 33 44 55 66",
        city: "Bordeaux",
        role: "cadre" as UserRole,
        points_fidelite: 0,
      },
    ];

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const existingEmails = new Set(
      existingUsers.map((u: any) => u.email.toLowerCase())
    );

    const mergedUsers = [
      ...existingUsers,
      ...mockUsers.filter((u) => !existingEmails.has(u.email.toLowerCase())),
    ];

    localStorage.setItem("users", JSON.stringify(mergedUsers));

    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = async (
    userData: Omit<User, "id" | "points_fidelite"> & { password: string }
  ) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((u: User) => u.email === userData.email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      city: userData.city,
      role: userData.role,
      points_fidelite: 0,
    };

    users.push({ ...newUser, password: userData.password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);

    return true;
  };

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (u: any) =>
        u.email.toLowerCase() === email.toLowerCase().trim() &&
        u.password === password
    );

    if (!foundUser) return false;

    const { password: _, ...userWithoutPassword } = foundUser;
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  const addPoints = (points: number) => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      points_fidelite: user.points_fidelite + points,
    };

    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: any) =>
      u.id === updatedUser.id
        ? { ...u, points_fidelite: updatedUser.points_fidelite }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        addPoints,
        isAuthenticated: !!user,
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
