import React, { useContext, useState, createContext, PropsWithChildren, useEffect } from "react";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  token: string;
}


interface AuthContextType {
  user: User | null,
  loading: boolean,
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string, name_user: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  signIn: async () => {},
  signOut: () => {},
  signUp: async () => {},
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const loadStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    loadStoredUser();
  }, []);

  async function signIn(email: string, password: string): Promise<void> {
    try {
        const response = await axios.post("http://3.209.65.64:3001/login", { email, password });
        const { token} = response.data;
        console.log(response.data)
        if (token) {
          const loggedUser: User = {
            email: email,
            token
          };
          console.log(loggedUser)
          await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
          setUser(loggedUser);
        } else {
            throw new Error("Email ou senha incorretos");
        }
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}

async function signUp(email: string, password: string, name_user: string): Promise<void> {
  setLoading(true);
  try {
    await axios.post("http://3.209.65.64:3001/usuarios", { email, password, name_user });
    await signIn(email, password);
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  } finally {
    setLoading(false);
  }
}

  const signOut = async (): Promise<void> => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}