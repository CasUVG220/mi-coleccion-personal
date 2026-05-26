// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

const preferenciaInicial = {
  vistaCompacta: false,
  ordenarPor: "fechaActividad",
  mostrarInactivos: true,
};

export function UserProvider({ children }) {
  const [nombre, setNombre] = useState(() => {
    return localStorage.getItem("user_nombre") || "";
  });

  const [preferencias, setPreferencias] = useState(() => {
    const guardadas = localStorage.getItem("user_preferencias");
    return guardadas ? JSON.parse(guardadas) : preferenciaInicial;
  });

  useEffect(() => {
    localStorage.setItem("user_nombre", nombre);
  }, [nombre]);

  useEffect(() => {
    localStorage.setItem("user_preferencias", JSON.stringify(preferencias));
  }, [preferencias]);

  function actualizarPreferencia(key, value) {
    setPreferencias((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <UserContext.Provider value={{ nombre, setNombre, preferencias, actualizarPreferencia }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}