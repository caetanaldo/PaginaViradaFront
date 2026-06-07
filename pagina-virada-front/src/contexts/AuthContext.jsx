import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  
    useEffect(() => {
        const token = localStorage.getItem("token");
        const nome = localStorage.getItem("nome");
        const tipo = localStorage.getItem("tipo");
        if (token) setUsuario({ token, nome, tipo });
    }, []);

    function login(dados) {
        localStorage.setItem("token", dados.token);
        localStorage.setItem("nome", dados.nome);
        localStorage.setItem("tipo", dados.tipo);
        setUsuario(dados);
    }

    function logout() {
        localStorage.clear();
        setUsuario(null);
    }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}