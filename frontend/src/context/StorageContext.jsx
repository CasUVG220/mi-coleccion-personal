// src/context/StorageContext.jsx
import { createContext, useContext, useState } from "react";
import { cargarSesiones, guardarSesiones } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

const StorageContext = createContext();

const API_URL = "http://localhost:3000/api/items";

export function StorageProvider({ children }) {
  const [modo, setModo] = useState("local"); // "local" | "api"

  async function obtenerItems() {
    if (modo === "api") {
      const res = await fetch(API_URL);
      return await res.json();
    } else {
      return cargarSesiones();
    }
  }

  async function guardarItem(item) {
    if (modo === "api") {
      if (item.id) {
        // Actualizar
        const res = await fetch(`${API_URL}/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        return await res.json();
      } else {
        // Crear
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        return await res.json();
      }
    } else {
      const sesiones = cargarSesiones();
      const existe = sesiones.find((s) => s.id === item.id);
      if (existe) {
        const actualizadas = sesiones.map((s) => (s.id === item.id ? item : s));
        guardarSesiones(actualizadas);
        return item;
      } else {
        const nueva = { ...item, id: item.id || uuidv4() };
        guardarSesiones([...sesiones, nueva]);
        return nueva;
      }
    }
  }

  async function eliminarItem(id) {
    if (modo === "api") {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } else {
      const sesiones = cargarSesiones();
      guardarSesiones(sesiones.filter((s) => s.id !== id));
    }
  }

  return (
    <StorageContext.Provider value={{ modo, setModo, obtenerItems, guardarItem, eliminarItem }}>
      {children}
    </StorageContext.Provider>
  );
}

export function useStorage() {
  return useContext(StorageContext);
}