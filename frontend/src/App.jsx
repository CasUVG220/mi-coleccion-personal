// src/App.jsx
import { useReducer, useEffect, useRef, useMemo, useCallback } from "react";
import { StorageProvider } from "./context/StorageContext";
import { ThemeProvider, useTema } from "./context/ThemeContext";
import { UserProvider, useUser } from "./context/UserContext";
import { useStorage } from "./context/StorageContext";
import { itemsReducer, estadoInicial } from "./reducers/itemsReducer";
import FormularioItem from "./components/FormularioItem";
import ListaItems from "./components/ListaItems";
import Dashboard from "./components/Dashboard";
import useAtajoTeclado from "./hooks/useAtajoTeclado";
import useRacha from "./hooks/useRacha";

function AppContenido() {
  const { modo, setModo, obtenerItems, guardarItem, eliminarItem } = useStorage();
  const { tema, toggleTema } = useTema();
  const { nombre, setNombre } = useUser();
  const [state, dispatch] = useReducer(itemsReducer, estadoInicial);
  const [editandoNombre, setEditandoNombre] = useReducer((s, a) => a, false);

  const inputRef = useRef(null);
  const intervaloRef = useRef(null);

  useEffect(() => {
    cargar();
  }, [modo]);

  useEffect(() => {
    if (modo === "api") {
      intervaloRef.current = setInterval(cargar, 30000);
    }
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [modo]);

  async function cargar() {
    const items = await obtenerItems();
    dispatch({ type: "HIDRATAR", payload: items });
  }

  const agregarSesion = useCallback(async (nueva) => {
    await guardarItem(nueva);
    const items = await obtenerItems();
    dispatch({ type: "HIDRATAR", payload: items });
    if (inputRef.current) inputRef.current.focus();
  }, [guardarItem, obtenerItems]);

  const editarSesion = useCallback(async (actualizada) => {
    await guardarItem(actualizada);
    const items = await obtenerItems();
    dispatch({ type: "HIDRATAR", payload: items });
  }, [guardarItem, obtenerItems]);

  const eliminarSesion = useCallback(async (id) => {
    await eliminarItem(id);
    dispatch({ type: "ELIMINAR", payload: id });
  }, [eliminarItem]);

  const cambiarEstado = useCallback((id, estado) => {
    dispatch({ type: "CAMBIAR_ESTADO", payload: { id, estado } });
  }, []);

  const racha = useRacha(state.lista);

  const atajoPorRef = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);
  useAtajoTeclado("ctrl+k", atajoPorRef);

  const sesionesFiltradas = useMemo(() => {
    return state.lista.filter((s) => {
      const porCategoria = state.filtroCategoria === "todas" || s.categoriaId === state.filtroCategoria;
      const porEstado = state.filtroEstado === "todos" || s.estado === state.filtroEstado;
      const porBusqueda = s.nombre.toLowerCase().includes(state.busqueda.toLowerCase());
      return porCategoria && porEstado && porBusqueda;
    });
  }, [state.lista, state.filtroCategoria, state.filtroEstado, state.busqueda]);

  const estadisticas = useMemo(() => {
    const total = state.lista.length;
    const completadas = state.lista.filter((s) => s.estado === "completado").length;
    const promedioPuntuacion = total > 0
      ? (state.lista.reduce((acc, s) => acc + Number(s.puntuacion), 0) / total).toFixed(1)
      : 0;
    return { total, completadas, promedioPuntuacion };
  }, [state.lista]);

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
          <div style={{ marginTop: 4, fontSize: 14, color: "var(--texto-secundario)", display: "flex", gap: "1rem", alignItems: "center" }}>
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
              <span onClick={() => setEditandoNombre(true)} style={{ cursor: "pointer" }}>
                {nombre ? `Hola, ${nombre}` : "Clic para agregar tu nombre"}
              </span>
            )}
            {racha > 1 && (
              <span style={{
                backgroundColor: "var(--acento)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                padding: "2px 10px",
                borderRadius: 20
              }}>
                {racha} dias seguidos
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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

      {/* Estadísticas rápidas */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "1rem",
        marginBottom: "2rem"
      }}>
        {[
          { label: "Total sesiones", valor: estadisticas.total },
          { label: "Completadas", valor: estadisticas.completadas },
          { label: "Puntuacion promedio", valor: estadisticas.promedioPuntuacion },
        ].map((stat) => (
          <div key={stat.label} style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--borde)",
            borderRadius: 10,
            padding: "1rem",
            textAlign: "center"
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--acento)" }}>{stat.valor}</div>
            <div style={{ fontSize: 13, color: "var(--texto-secundario)" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--borde)",
        borderRadius: 10,
        padding: "1rem",
        marginBottom: "2rem",
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        <input
          placeholder="Buscar sesion..."
          value={state.busqueda}
          onChange={(e) => dispatch({ type: "FILTRAR", payload: { campo: "busqueda", valor: e.target.value } })}
          style={{
            flex: 1,
            minWidth: 160,
            padding: "8px",
            borderRadius: 6,
            border: "1px solid var(--borde)",
            backgroundColor: "var(--bg)",
            color: "var(--texto)"
          }}
        />
        <select
          value={state.filtroCategoria}
          onChange={(e) => dispatch({ type: "FILTRAR", payload: { campo: "filtroCategoria", valor: e.target.value } })}
          style={{
            padding: "8px",
            borderRadius: 6,
            border: "1px solid var(--borde)",
            backgroundColor: "var(--bg)",
            color: "var(--texto)"
          }}
        >
          <option value="todas">Todas las categorias</option>
          <option value="fuerza">Fuerza</option>
          <option value="cardio">Cardio</option>
          <option value="hiit">HIIT</option>
          <option value="flexibilidad">Flexibilidad</option>
          <option value="descanso">Descanso</option>
        </select>
        <select
          value={state.filtroEstado}
          onChange={(e) => dispatch({ type: "FILTRAR", payload: { campo: "filtroEstado", valor: e.target.value } })}
          style={{
            padding: "8px",
            borderRadius: 6,
            border: "1px solid var(--borde)",
            backgroundColor: "var(--bg)",
            color: "var(--texto)"
          }}
        >
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <button
          onClick={() => dispatch({ type: "LIMPIAR_FILTROS" })}
          style={{
            backgroundColor: "var(--bg)",
            color: "var(--texto-secundario)",
            border: "1px solid var(--borde)",
            padding: "8px 14px",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Limpiar
        </button>
      </div>

      <Dashboard sesiones={state.lista} />

      <FormularioItem onAgregar={agregarSesion} inputRef={inputRef} />
      <ListaItems
        sesiones={sesionesFiltradas}
        onEliminar={eliminarSesion}
        onEditar={editarSesion}
        onCambiarEstado={cambiarEstado}
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