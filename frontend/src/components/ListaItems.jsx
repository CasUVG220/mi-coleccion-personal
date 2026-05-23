// src/components/ListaItems.jsx
import ItemCard from "./ItemCard";

function ListaItems({ sesiones, onEliminar, onEditar }) {
  if (sesiones.length === 0) {
    return <p>No hay sesiones registradas aún.</p>;
  }

  return (
    <div>
      <h2>Mis Sesiones ({sesiones.length})</h2>
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