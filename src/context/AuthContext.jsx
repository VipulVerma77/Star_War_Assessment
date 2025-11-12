import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, verifyJwtToken } from "../api/auth.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("@JWT_TOKEN");
    if (savedToken) {
      const validUser = verifyJwtToken(savedToken);
      if (validUser) {
        setUser({ email: validUser.email });
        setJwtToken(savedToken);
      } else {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = async (email, password) => {
    const { token } = await loginUser(email, password);
    localStorage.setItem("@JWT_TOKEN", token);
    setJwtToken(token);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem("@JWT_TOKEN");
    setUser(null);
    setJwtToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, jwtToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
