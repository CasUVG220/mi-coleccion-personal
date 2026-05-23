// src/App.jsx
import { useState, useEffect } from "react";
import { cargarSesiones, guardarSesiones } from "./utils/storage";
import FormularioItem from "./components/FormularioItem";
import ListaItems from "./components/ListaItems";

function App() {
  // Lazy initializer — carga desde LocalStorage solo al montar
  const [sesiones, setSesiones] = useState(() => cargarSesiones());

  // Sincroniza con LocalStorage cada vez que cambia el estado
  useEffect(() => {
    guardarSesiones(sesiones);
  }, [sesiones]);

  function agregarSesion(nueva) {
    setSesiones((prev) => [...prev, nueva]);
  }

  function eliminarSesion(id) {
    setSesiones((prev) => prev.filter((s) => s.id !== id));
  }

  function editarSesion(actualizada) {
    setSesiones((prev) =>
      prev.map((s) => (s.id === actualizada.id ? actualizada : s))
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1>Mi Bitácora de Entrenamiento</h1>
      <FormularioItem onAgregar={agregarSesion} />
      <ListaItems
        sesiones={sesiones}
        onEliminar={eliminarSesion}
        onEditar={editarSesion}
      />
    </div>
  );
}

export default App;