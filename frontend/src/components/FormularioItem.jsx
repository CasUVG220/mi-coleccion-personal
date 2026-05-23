// src/components/FormularioItem.jsx
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CATEGORIAS = ["fuerza", "cardio", "flexibilidad", "hiit", "descanso"];

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

function FormularioItem({ onAgregar }) {
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
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h2>Nueva Sesión</h2>

      <div>
        <label>Nombre de la sesión</label><br />
        <input name="nombre" value={form.nombre} onChange={handleChange} required />
      </div>

      <div>
        <label>Categoría</label><br />
        <select name="categoriaId" value={form.categoriaId} onChange={handleChange}>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
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
        <label>Fecha de actividad</label><br />
        <input type="date" name="fechaActividad"
          value={form.fechaActividad} onChange={handleChange} />
      </div>

      <div>
        <label>Notas</label><br />
        <textarea name="notas" value={form.notas} onChange={handleChange} rows={3} />
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

      <button type="submit">Agregar Sesión</button>
    </form>
  );
}

export default FormularioItem;