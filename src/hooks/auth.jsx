/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import {api} from "../services/api";

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [data, setData] = useState({});


  async function signIn({ matricula, password }) {
    try {
      const response = await api.post("session", { matricula, password });
      const { user, token } = response.data;

      localStorage.setItem("@cenergia:user", JSON.stringify(user));
      localStorage.setItem("@cenergia:token", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Não foi possível logar");
      }
    }
  }

  
  function signOut() {
    localStorage.removeItem("@cenergia:token");
    localStorage.removeItem("@cenergia:user");

    setData({});
  }


  useEffect(() => {
    const token = localStorage.getItem("@cenergia:token");
    const user = localStorage.getItem("@cenergia:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({
        token,
        user: JSON.parse(user),
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };