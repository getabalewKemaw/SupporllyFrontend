import { createContext } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logoutUser: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);
