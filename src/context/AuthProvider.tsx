import React, { useState, useEffect } from "react";
import { getCurrentUser, logout } from "../api/auth";
import { AuthContext, type User } from "./AuthContext";  // import context and User type


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data.success) setUser(data.user);
      } catch (err) {
        setUser(null);
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
