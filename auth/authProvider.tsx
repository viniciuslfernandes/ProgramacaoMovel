import React, { useContext, useState, createContext, PropsWithChildren } from "react";
import axios from "axios";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string, name_user: string) => Promise<void>;
  session?: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  userEmail?: string | null;
}

const AuthContext = createContext<AuthContextType>({
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
  session: null,
  isLoading: false,
  isAuthenticated: false,
  userEmail: null,
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setLoading] = useState(false);
  const [session, setSession] = useState<string | null>(null);
  const isAuthenticated = Boolean(session);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  async function signIn(email: string, password: string): Promise<void> {
    try {
        const response = await axios.post("http://192.168.3.5:3000/login", { email, password });
        const { token } = response.data;
        console.log(token)
        if (token) {
            setLoading(true);
            setUserEmail(email);
        } else {
            throw new Error("Email ou senha incorretos");
        }
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}

  const signUp = async (email: string, password: string, name_user: string) => {
    setLoading(true);
    try {
      await axios.post("http://192.168.3.5:3000/usuarios", { email, password, name_user});
      await signIn(email, password);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setSession(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, signUp, session, isLoading, isAuthenticated, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}