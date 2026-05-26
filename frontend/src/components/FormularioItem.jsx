// src/components/FormularioItem.jsx
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CATEGORIAS } from "../utils/categorias";

const estadoInicial = {
  nombre: "",
  categoriaId: "fuerza",
  estado: "pendiente",
  puntuacion: 5,
  fechaRegistro: new Date().toISOString().split("T")[0],
  fechaActividad: new Date().toISOString().split("T")[0],
  notas: "",
  atributos: { duracion: 60, series: 3 },
  activo: true,
};

function FormularioItem({ onAgregar, inputRef }) {
  const [form, setForm] = useState(estadoInicial);

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.nombre.trim()) return;

    const nueva = {
      ...form,
      id: uuidv4(),
      puntuacion: Number(form.puntuacion),
    };

    onAgregar(nueva);
    setForm(estadoInicial);
  }

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: "var(--bg-card)",
      border: "1px solid var(--borde)",
      borderRadius: 10,
      padding: "1.5rem",
      marginBottom: "2rem"
    }}>
      <h2 style={{ marginTop: 0, color: "var(--texto)" }}>Nueva Sesion</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Nombre de la sesion</label><br />
        <input
          ref={inputRef}
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          placeholder="Ej: Dia de piernas"
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
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

      <div style={{ marginBottom: "1rem" }}>
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Fecha de actividad</label><br />
          <input
            type="date"
            name="fechaActividad"
            value={form.fechaActividad}
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
      </div>

      <div style={{ marginBottom: "1rem" }}>
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

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Notas</label><br />
        <textarea
          name="notas"
          value={form.notas}
          onChange={handleChange}
          rows={3}
          placeholder="Observaciones de la sesion..."
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

      <button
        type="submit"
        style={{
          backgroundColor: "var(--acento)",
          color: "#fff",
          border: "none",
          padding: "10px 24px",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 15,
          fontWeight: 600
        }}
      >
        Agregar Sesion
      </button>
    </form>
  );
}

export default FormularioItem;