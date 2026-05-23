// src/utils/storage.js
const KEY = "sesiones_entrenamiento";

export function cargarSesiones() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function guardarSesiones(sesiones) {
  localStorage.setItem(KEY, JSON.stringify(sesiones));
}