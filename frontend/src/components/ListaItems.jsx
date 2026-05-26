// src/components/ListaItems.jsx
import ItemCard from "./ItemCard";
import { useStorage } from "../context/StorageContext";

function ListaItems({ sesiones, onEliminar, onEditar }) {
  const { modo } = useStorage();

  if (sesiones.length === 0) {
    return (
      <div style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--borde)",
        borderRadius: 10,
        padding: "2rem",
        textAlign: "center",
        color: "var(--texto-secundario)"
      }}>
        <p style={{ fontSize: 16 }}>No hay sesiones registradas aun.</p>
        <p style={{ fontSize: 13 }}>Modo activo: <strong>{modo}</strong></p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ margin: 0, color: "var(--texto)" }}>
          Mis Sesiones ({sesiones.length})
        </h2>
        <span style={{
          fontSize: 12,
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--borde)",
          color: "var(--texto-secundario)",
          padding: "4px 10px",
          borderRadius: 20
        }}>
          {modo === "api" ? "API" : "LocalStorage"}
        </span>
      </div>

      {sesiones.map((s) => (
        <ItemCard
          key={s.id}
          sesion={s}
          onEliminar={onEliminar}
          onEditar={onEditar}
        />
      ))}
    </div>
  );
}

export default ListaItems;