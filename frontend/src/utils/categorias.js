// src/utils/categorias.js
export const CATEGORIAS = [
  { id: "fuerza",       nombre: "Fuerza",       color: "#e74c3c" },
  { id: "cardio",       nombre: "Cardio",       color: "#3498db" },
  { id: "hiit",         nombre: "HIIT",         color: "#f39c12" },
  { id: "flexibilidad", nombre: "Flexibilidad", color: "#2ecc71" },
  { id: "descanso",     nombre: "Descanso",     color: "#9b59b6" },
];

export function getCategoriaById(id) {
  return CATEGORIAS.find((c) => c.id === id) || CATEGORIAS[0];
}