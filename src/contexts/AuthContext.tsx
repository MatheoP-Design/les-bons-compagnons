import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'particulier' | 'cadre';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Always initialize mock users - merge with existing if needed
    const mockUsers = [
      // Particuliers
      { id: 'user1', email: 'sophie@example.com', password: '123456', firstName: 'Sophie', lastName: 'Bernard', phone: '06 12 34 56 78', city: 'Lyon', role: 'particulier' as UserRole },
      { id: 'user2', email: 'pierre@example.com', password: '123456', firstName: 'Pierre', lastName: 'Martin', phone: '06 23 45 67 89', city: 'Paris', role: 'particulier' as UserRole },
      { id: 'user3', email: 'marie@example.com', password: '123456', firstName: 'Marie', lastName: 'Dubois', phone: '06 34 56 78 90', city: 'Bordeaux', role: 'particulier' as UserRole },
      { id: 'user4', email: 'lucas@example.com', password: '123456', firstName: 'Lucas', lastName: 'Moreau', phone: '06 45 67 89 01', city: 'Toulouse', role: 'particulier' as UserRole },
      // Cadres
      { id: 'cadre1', email: 'jean@compagnons.fr', password: '123456', firstName: 'Jean', lastName: 'Dupont', phone: '06 11 22 33 44', city: 'Lyon', role: 'cadre' as UserRole },
      { id: 'cadre2', email: 'paul@compagnons.fr', password: '123456', firstName: 'Paul', lastName: 'Lefebvre', phone: '06 22 33 44 55', city: 'Paris', role: 'cadre' as UserRole },
      { id: 'cadre3', email: 'michel@compagnons.fr', password: '123456', firstName: 'Michel', lastName: 'Garnier', phone: '06 33 44 55 66', city: 'Bordeaux', role: 'cadre' as UserRole },
    ];

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Merge existing users with mock users, keeping existing if email matches
    const existingEmails = new Set(existingUsers.map((u: any) => u.email.toLowerCase()));
    const newMockUsers = mockUsers.filter(u => !existingEmails.has(u.email.toLowerCase()));
    const allUsers = [...existingUsers, ...newMockUsers];
    
    localStorage.setItem('users', JSON.stringify(allUsers));

    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // Invalid user data, clear it
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    // Mock registration - store in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
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
    };

    users.push({ ...newUser, password: userData.password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const login = async (email: string, password: string) => {
    // Mock login - check localStorage
    let users: any[] = [];
    try {
      users = JSON.parse(localStorage.getItem('users') || '[]');
    } catch (e) {
      users = [];
    }
    
    // Ensure mock users exist
    const mockUsers = [
      // Particuliers
      { id: 'user1', email: 'sophie@example.com', password: '123456', firstName: 'Sophie', lastName: 'Bernard', phone: '06 12 34 56 78', city: 'Lyon', role: 'particulier' as UserRole },
      { id: 'user2', email: 'pierre@example.com', password: '123456', firstName: 'Pierre', lastName: 'Martin', phone: '06 23 45 67 89', city: 'Paris', role: 'particulier' as UserRole },
      { id: 'user3', email: 'marie@example.com', password: '123456', firstName: 'Marie', lastName: 'Dubois', phone: '06 34 56 78 90', city: 'Bordeaux', role: 'particulier' as UserRole },
      { id: 'user4', email: 'lucas@example.com', password: '123456', firstName: 'Lucas', lastName: 'Moreau', phone: '06 45 67 89 01', city: 'Toulouse', role: 'particulier' as UserRole },
      // Cadres
      { id: 'cadre1', email: 'jean@compagnons.fr', password: '123456', firstName: 'Jean', lastName: 'Dupont', phone: '06 11 22 33 44', city: 'Lyon', role: 'cadre' as UserRole },
      { id: 'cadre2', email: 'paul@compagnons.fr', password: '123456', firstName: 'Paul', lastName: 'Lefebvre', phone: '06 22 33 44 55', city: 'Paris', role: 'cadre' as UserRole },
      { id: 'cadre3', email: 'michel@compagnons.fr', password: '123456', firstName: 'Michel', lastName: 'Garnier', phone: '06 33 44 55 66', city: 'Bordeaux', role: 'cadre' as UserRole },
    ];

    // Merge with existing users
    const existingEmails = new Set(users.map((u: any) => u.email?.toLowerCase() || ''));
    const newMockUsers = mockUsers.filter(u => !existingEmails.has(u.email.toLowerCase()));
    const allUsers = [...users, ...newMockUsers];
    localStorage.setItem('users', JSON.stringify(allUsers));
    
    // Normalize email for comparison
    const normalizedEmail = email.toLowerCase().trim();
    const foundUser = allUsers.find((u: any) => 
      u.email?.toLowerCase().trim() === normalizedEmail && u.password === password
    );
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
