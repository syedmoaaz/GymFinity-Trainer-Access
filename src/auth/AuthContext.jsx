import { createContext, useContext, useMemo, useState } from "react";
import { loginTrainer } from "../api/portal.api";

const AuthContext = createContext(null);

function readStoredTrainer() {
  try {
    const raw = localStorage.getItem("trainerProfile");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("trainerToken"));
  const [trainer, setTrainer] = useState(() => readStoredTrainer());

  const value = useMemo(
    () => ({
      token,
      trainer,
      isAuthenticated: Boolean(token),
      async login(phone, password) {
        const data = await loginTrainer(phone, password);
        localStorage.setItem("trainerToken", data.token);
        localStorage.setItem("trainerProfile", JSON.stringify(data.trainer));
        setToken(data.token);
        setTrainer(data.trainer);
        return data;
      },
      logout() {
        localStorage.removeItem("trainerToken");
        localStorage.removeItem("trainerProfile");
        setToken(null);
        setTrainer(null);
      },
    }),
    [token, trainer]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
