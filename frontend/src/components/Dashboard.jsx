// src/components/Dashboard.jsx
import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line, CartesianGrid,
} from "recharts";
import { CATEGORIAS } from "../utils/categorias";

function Dashboard({ sesiones }) {

  //Actividad ultimos 7 dias
  const actividadSemana = useMemo(() => {
    const hoy = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() - (6 - i));
      const fechaStr = fecha.toISOString().split("T")[0];
      const dia = fecha.toLocaleDateString("es-GT", { weekday: "short" });
      const count = sesiones.filter((s) => s.fechaActividad === fechaStr).length;
      return { dia, sesiones: count };
    });
  }, [sesiones]);

  //Distribucion por categoria
  const porCategoria = useMemo(() => {
    return CATEGORIAS.map((cat) => ({
      name: cat.nombre,
      value: sesiones.filter((s) => s.categoriaId === cat.id).length,
      color: cat.color,
    })).filter((c) => c.value > 0);
  }, [sesiones]);

  //Promedio de puntuacion por categoria
  const promedioPorCategoria = useMemo(() => {
    return CATEGORIAS.map((cat) => {
      const items = sesiones.filter((s) => s.categoriaId === cat.id);
      const promedio = items.length > 0
        ? items.reduce((acc, s) => acc + Number(s.puntuacion), 0) / items.length
        : 0;
      return { categoria: cat.nombre, promedio: parseFloat(promedio.toFixed(1)) };
    }).filter((c) => c.promedio > 0);
  }, [sesiones]);

  if (sesiones.length === 0) return null;

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2 style={{ color: "var(--texto)", marginBottom: "1rem" }}>Dashboard</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>

        {/*Actividad ultimos 7 dias */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--borde)",
          borderRadius: 10,
          padding: "1.25rem"
        }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: 14, color: "var(--texto-secundario)" }}>
            Actividad ultimos 7 dias
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={actividadSemana}>
              <XAxis dataKey="dia" tick={{ fill: "var(--texto-secundario)", fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: "var(--texto-secundario)", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--borde)", color: "var(--texto)" }}
              />
              <Bar dataKey="sesiones" fill="var(--acento)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/*Distribucion por categoria */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--borde)",
          borderRadius: 10,
          padding: "1.25rem"
        }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: 14, color: "var(--texto-secundario)" }}>
            Distribucion por categoria
          </h3>
          {porCategoria.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={porCategoria}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {porCategoria.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--borde)", color: "var(--texto)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Sin datos suficientes.</p>
          )}
        </div>

        {/*Promedio de puntuacion por categoria */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--borde)",
          borderRadius: 10,
          padding: "1.25rem"
        }}>
          <h3 style={{ margin: "0 0 1rem 0", fontSize: 14, color: "var(--texto-secundario)" }}>
            Puntuacion promedio por categoria
          </h3>
          {promedioPorCategoria.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={promedioPorCategoria}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--borde)" />
                <XAxis dataKey="categoria" tick={{ fill: "var(--texto-secundario)", fontSize: 11 }} />
                <YAxis domain={[0, 10]} tick={{ fill: "var(--texto-secundario)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--borde)", color: "var(--texto)" }}
                />
                <Line type="monotone" dataKey="promedio" stroke="var(--acento)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "var(--texto-secundario)", fontSize: 13 }}>Sin datos suficientes.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;