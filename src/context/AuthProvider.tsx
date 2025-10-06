import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { getCurrentUser, logout, refreshAccessToken } from "../api/auth";
import { AuthContext, type User } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🚀 Initial Auth Check on App Load
  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await getCurrentUser();
        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err: AxiosError) {
        // Try refresh if access token expired
        if (err.response?.status === 401) {
          const refreshed = await refreshAccessToken();
          if (refreshed?.success) {
            const retry = await getCurrentUser();
            if (retry.success) setUser(retry.user);
            else setUser(null);
          } else {
            setUser(null);
          }
        } else {
          console.error("Error checking auth:", err);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  // 🔄 Optional: Background refresh every 10 mins
  useEffect(() => {
    const interval = setInterval(async () => {
      await refreshAccessToken();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
