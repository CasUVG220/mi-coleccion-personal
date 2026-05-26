// src/App.jsx
import { useState, useEffect, useRef } from "react";
import { StorageProvider } from "./context/StorageContext";
import { ThemeProvider, useTema } from "./context/ThemeContext";
import { UserProvider, useUser } from "./context/UserContext";
import FormularioItem from "./components/FormularioItem";
import ListaItems from "./components/ListaItems";
import { useStorage } from "./context/StorageContext";

function AppContenido() {
  const { modo, setModo, obtenerItems, guardarItem, eliminarItem } = useStorage();
  const { tema, toggleTema } = useTema();
  const { nombre, setNombre, preferencias } = useUser();
  const [sesiones, setSesiones] = useState([]);
  const [editandoNombre, setEditandoNombre] = useState(false);

  // useRef #1 — focus en input del formulario tras agregar
  const inputRef = useRef(null);

  // useRef #2 — ID del intervalo de auto-refresh en modo API
  const intervaloRef = useRef(null);

  useEffect(() => {
    cargar();
  }, [modo]);

  // Auto-refresh cada 30s en modo API
  useEffect(() => {
    if (modo === "api") {
      intervaloRef.current = setInterval(() => {
        cargar();
      }, 30000);
    }
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [modo]);

  async function cargar() {
    const items = await obtenerItems();
    // Filtrar inactivos según preferencia
    const filtrados = preferencias.mostrarInactivos
      ? items
      : items.filter((s) => s.activo);
    setSesiones(filtrados);
  }

  async function agregarSesion(nueva) {
    await guardarItem(nueva);
    await cargar();
    // useRef #1 — focus automático tras agregar
    if (inputRef.current) inputRef.current.focus();
  }

  async function editarSesion(actualizada) {
    await guardarItem(actualizada);
    await cargar();
  }

  async function eliminarSesion(id) {
    await eliminarItem(id);
    await cargar();
  }

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "var(--bg)",
      color: "var(--texto)",
      padding: "2rem",
      transition: "all 0.3s ease"
    }}>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div>
          <h1 style={{ margin: 0 }}>Bitacora de Entrenamiento</h1>
          <div style={{ marginTop: 4, fontSize: 14, color: "var(--texto-secundario)" }}>
            {editandoNombre ? (
              <input
                autoFocus
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onBlur={() => setEditandoNombre(false)}
                onKeyDown={(e) => e.key === "Enter" && setEditandoNombre(false)}
                placeholder="Tu nombre..."
                style={{
                  backgroundColor: "var(--bg-card)",
                  color: "var(--texto)",
                  border: "1px solid var(--borde)",
                  padding: "4px 8px",
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            ) : (
              <span
                onClick={() => setEditandoNombre(true)}
                style={{ cursor: "pointer" }}
                title="Clic para editar tu nombre"
              >
                {nombre ? `Hola, ${nombre}` : "Clic para agregar tu nombre"}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* Toggle modo */}
          <label style={{ fontSize: 14, color: "var(--texto-secundario)" }}>
            Modo:&nbsp;
            <select
              value={modo}
              onChange={(e) => setModo(e.target.value)}
              style={{
                backgroundColor: "var(--bg-card)",
                color: "var(--texto)",
                border: "1px solid var(--borde)",
                padding: "4px 8px",
                borderRadius: 6
              }}
            >
              <option value="local">LocalStorage</option>
              <option value="api">API</option>
            </select>
          </label>

          {/* Toggle tema */}
          <button
            onClick={toggleTema}
            title="Atajo: T"
            style={{
              backgroundColor: "var(--bg-card)",
              color: "var(--texto)",
              border: "1px solid var(--borde)",
              padding: "6px 14px",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            {tema === "claro" ? "Modo Oscuro" : "Modo Claro"}
          </button>
        </div>
      </div>

      <FormularioItem onAgregar={agregarSesion} inputRef={inputRef} />
      <ListaItems
        sesiones={sesiones}
        onEliminar={eliminarSesion}
        onEditar={editarSesion}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <StorageProvider>
          <AppContenido />
        </StorageProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;