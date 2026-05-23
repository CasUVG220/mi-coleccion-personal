// src/components/ItemCard.jsx
import { useState } from "react";

function ItemCard({ sesion, onEliminar, onEditar }) {
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState(sesion);

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
      <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: 8 }}>
        <h3>Editando sesión</h3>

        <div>
          <label>Nombre</label><br />
          <input name="nombre" value={form.nombre} onChange={handleChange} />
        </div>

        <div>
          <label>Estado</label><br />
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <div>
          <label>Puntuación ({form.puntuacion}/10)</label><br />
          <input type="range" name="puntuacion" min="1" max="10"
            value={form.puntuacion} onChange={handleChange} />
        </div>

        <div>
          <label>Notas</label><br />
          <textarea name="notas" value={form.notas} onChange={handleChange} rows={2} />
        </div>

        <div>
          <label>Duración (min)</label><br />
          <input type="number" name="duracion"
            value={form.atributos.duracion} onChange={handleAtributos} />
        </div>

        <div>
          <label>Series</label><br />
          <input type="number" name="series"
            value={form.atributos.series} onChange={handleAtributos} />
        </div>

        <div>
          <label>
            <input type="checkbox" name="activo"
              checked={form.activo} onChange={handleChange} />
            {" "}Activo
          </label>
        </div>

        <button onClick={handleGuardar}>Guardar</button>
        <button onClick={() => setEditando(false)} style={{ marginLeft: 8 }}>Cancelar</button>
      </div>
    );
  }

  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      marginBottom: "1rem",
      borderRadius: 8,
      opacity: sesion.activo ? 1 : 0.5
    }}>
      <h3>{sesion.nombre} {sesion.activo ? "" : " (Inactivo)"}</h3>
      <p>Categoría: {sesion.categoriaId} — {sesion.estado}</p>
      <p>Puntuación: {sesion.puntuacion}/10</p>
      <p>Fecha: {sesion.fechaActividad}</p>
      <p>Duración: {sesion.atributos.duracion} min | Series: {sesion.atributos.series}</p>
      {sesion.notas && <p>Notas: {sesion.notas}</p>}

      <button onClick={() => setEditando(true)}>Editar</button>
      <button onClick={() => onEliminar(sesion.id)}
        style={{ marginLeft: 8, color: "red" }}>
        Eliminar
      </button>
    </div>
  );
}

export default ItemCard;