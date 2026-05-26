// src/components/ItemCard.jsx
import { useState } from "react";
import { CATEGORIAS, getCategoriaById } from "../utils/categorias";

function ItemCard({ sesion, onEliminar, onEditar }) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState(sesion);

  const categoria = getCategoriaById(sesion.categoriaId);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleAtributos(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      atributos: { ...prev.atributos, [name]: Number(value) },
    }));
  }

  function handleGuardar() {
    onEditar({ ...form, puntuacion: Number(form.puntuacion) });
    setEditando(false);
  }

  if (editando) {
    return (
      <div style={{
        backgroundColor: "var(--bg-card)",
        border: `2px solid ${categoria.color}`,
        borderRadius: 10,
        padding: "1.5rem",
        marginBottom: "1rem"
      }}>
        <h3 style={{ marginTop: 0, color: "var(--texto)" }}>Editando sesion</h3>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Nombre</label><br />
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: 6,
              border: "1px solid var(--borde)",
              backgroundColor: "var(--bg)",
              color: "var(--texto)",
              marginTop: 4
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Categoria</label><br />
            <select
              name="categoriaId"
              value={form.categoriaId}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                border: "1px solid var(--borde)",
                backgroundColor: "var(--bg)",
                color: "var(--texto)",
                marginTop: 4
              }}
            >
              {CATEGORIAS.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Estado</label><br />
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                border: "1px solid var(--borde)",
                backgroundColor: "var(--bg)",
                color: "var(--texto)",
                marginTop: 4
              }}
            >
              <option value="pendiente">Pendiente</option>
              <option value="completado">Completado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>
            Puntuacion: {form.puntuacion}/10
          </label><br />
          <input
            type="range"
            name="puntuacion"
            min="1"
            max="10"
            value={form.puntuacion}
            onChange={handleChange}
            style={{ width: "100%", marginTop: 4 }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
          <div>
            <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Duracion (min)</label><br />
            <input
              type="number"
              name="duracion"
              value={form.atributos.duracion}
              onChange={handleAtributos}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                border: "1px solid var(--borde)",
                backgroundColor: "var(--bg)",
                color: "var(--texto)",
                marginTop: 4
              }}
            />
          </div>

          <div>
            <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Series</label><br />
            <input
              type="number"
              name="series"
              value={form.atributos.series}
              onChange={handleAtributos}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: 6,
                border: "1px solid var(--borde)",
                backgroundColor: "var(--bg)",
                color: "var(--texto)",
                marginTop: 4
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "0.75rem" }}>
          <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Notas</label><br />
          <textarea
            name="notas"
            value={form.notas}
            onChange={handleChange}
            rows={2}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: 6,
              border: "1px solid var(--borde)",
              backgroundColor: "var(--bg)",
              color: "var(--texto)",
              marginTop: 4,
              resize: "vertical"
            }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "var(--texto)", fontSize: 14 }}>
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Activo
          </label>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={handleGuardar}
            style={{
              backgroundColor: "var(--acento)",
              color: "#fff",
              border: "none",
              padding: "8px 18px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Guardar
          </button>
          <button
            onClick={() => setEditando(false)}
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--texto)",
              border: "1px solid var(--borde)",
              padding: "8px 18px",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: "var(--bg-card)",
      border: `1px solid var(--borde)`,
      borderLeft: `4px solid ${categoria.color}`,
      borderRadius: 10,
      padding: "1.25rem",
      marginBottom: "1rem",
      opacity: sesion.activo ? 1 : 0.5,
      transition: "opacity 0.2s"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 style={{ margin: "0 0 4px 0", color: "var(--texto)" }}>
            {sesion.nombre}
            {!sesion.activo && <span style={{ fontSize: 12, marginLeft: 8, color: "var(--texto-secundario)" }}>(inactivo)</span>}
          </h3>
          <span style={{
            display: "inline-block",
            backgroundColor: categoria.color,
            color: "#fff",
            fontSize: 11,
            fontWeight: 600,
            padding: "2px 10px",
            borderRadius: 20,
            marginBottom: 8
          }}>
            {categoria.nombre}
          </span>
        </div>
        <span style={{
          fontSize: 22,
          fontWeight: 700,
          color: categoria.color
        }}>
          {sesion.puntuacion}/10
        </span>
      </div>

      <div style={{ display: "flex", gap: "1.5rem", fontSize: 13, color: "var(--texto-secundario)", marginBottom: 8 }}>
        <span>Estado: <strong style={{ color: "var(--texto)" }}>{sesion.estado}</strong></span>
        <span>Fecha: <strong style={{ color: "var(--texto)" }}>{sesion.fechaActividad}</strong></span>
        <span>Duracion: <strong style={{ color: "var(--texto)" }}>{sesion.atributos?.duracion} min</strong></span>
        <span>Series: <strong style={{ color: "var(--texto)" }}>{sesion.atributos?.series}</strong></span>
      </div>

      {sesion.notas && (
        <p style={{ fontSize: 13, color: "var(--texto-secundario)", margin: "4px 0 12px 0" }}>
          {sesion.notas}
        </p>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => setEditando(true)}
          style={{
            backgroundColor: "var(--bg)",
            color: "var(--texto)",
            border: "1px solid var(--borde)",
            padding: "6px 14px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13
          }}
        >
          Editar
        </button>
        <button
          onClick={() => onEliminar(sesion.id)}
          style={{
            backgroundColor: "var(--bg)",
            color: "#e74c3c",
            border: "1px solid #e74c3c",
            padding: "6px 14px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ItemCard;