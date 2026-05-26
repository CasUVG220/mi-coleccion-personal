// src/context/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "claro";
  });

  // Aplica variables CSS al :root según el tema
  useEffect(() => {
    const root = document.documentElement;
    if (tema === "oscuro") {
      root.style.setProperty("--bg", "#1a1a2e");
      root.style.setProperty("--bg-card", "#16213e");
      root.style.setProperty("--texto", "#eaeaea");
      root.style.setProperty("--texto-secundario", "#a0a0b0");
      root.style.setProperty("--borde", "#2a2a4a");
      root.style.setProperty("--acento", "#4f8ef7");
    } else {
      root.style.setProperty("--bg", "#f5f5f5");
      root.style.setProperty("--bg-card", "#ffffff");
      root.style.setProperty("--texto", "#1a1a1a");
      root.style.setProperty("--texto-secundario", "#666677");
      root.style.setProperty("--borde", "#dddddd");
      root.style.setProperty("--acento", "#2563eb");
    }
    localStorage.setItem("tema", tema);
  }, [tema]);

  // Atajo de teclado: T para toggle
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "t" || e.key === "T") {
        // Solo si no está escribiendo en un input
        if (document.activeElement.tagName !== "INPUT" &&
            document.activeElement.tagName !== "TEXTAREA") {
          setTema((prev) => (prev === "claro" ? "oscuro" : "claro"));
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // cleanup
  }, []);

  function toggleTema() {
    setTema((prev) => (prev === "claro" ? "oscuro" : "claro"));
  }

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTema() {
  return useContext(ThemeContext);
}