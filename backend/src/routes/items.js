// src/routes/items.js
const express = require("express");
const router = express.Router();
const db = require("../db/database");
const { v4: uuidv4 } = require("uuid");

// GET /api/items
router.get("/", (req, res) => {
  const items = db.prepare("SELECT * FROM items").all();
  const parsed = items.map((item) => ({
    ...item,
    atributos: JSON.parse(item.atributos),
    activo: item.activo === 1,
  }));
  res.json(parsed);
});

// GET /api/items/:id
router.get("/:id", (req, res) => {
  const item = db.prepare("SELECT * FROM items WHERE id = ?").get(req.params.id);
  if (!item) return res.status(404).json({ error: "No encontrado" });
  res.json({ ...item, atributos: JSON.parse(item.atributos), activo: item.activo === 1 });
});

// POST /api/items
router.post("/", (req, res) => {
  const { nombre, categoriaId, estado, puntuacion, fechaActividad, notas, atributos, activo } = req.body;

  if (!nombre || !categoriaId) {
    return res.status(400).json({ error: "nombre y categoriaId son requeridos" });
  }

  const nuevo = {
    id: uuidv4(),
    nombre,
    categoriaId,
    estado: estado || "pendiente",
    puntuacion: puntuacion || 5,
    fechaRegistro: new Date().toISOString().split("T")[0],
    fechaActividad: fechaActividad || new Date().toISOString().split("T")[0],
    notas: notas || "",
    atributos: JSON.stringify(atributos || {}),
    activo: activo !== undefined ? (activo ? 1 : 0) : 1,
  };

  db.prepare(`
    INSERT INTO items (id, nombre, categoriaId, estado, puntuacion, fechaRegistro, fechaActividad, notas, atributos, activo)
    VALUES (@id, @nombre, @categoriaId, @estado, @puntuacion, @fechaRegistro, @fechaActividad, @notas, @atributos, @activo)
  `).run(nuevo);

  res.status(201).json({ ...nuevo, atributos: atributos || {}, activo: activo !== false });
});

// PUT /api/items/:id
router.put("/:id", (req, res) => {
  const item = db.prepare("SELECT * FROM items WHERE id = ?").get(req.params.id);
  if (!item) return res.status(404).json({ error: "No encontrado" });

  const { nombre, categoriaId, estado, puntuacion, fechaActividad, notas, atributos, activo } = req.body;

  db.prepare(`
    UPDATE items SET
      nombre = ?,
      categoriaId = ?,
      estado = ?,
      puntuacion = ?,
      fechaActividad = ?,
      notas = ?,
      atributos = ?,
      activo = ?
    WHERE id = ?
  `).run(
    nombre ?? item.nombre,
    categoriaId ?? item.categoriaId,
    estado ?? item.estado,
    puntuacion ?? item.puntuacion,
    fechaActividad ?? item.fechaActividad,
    notas ?? item.notas,
    atributos ? JSON.stringify(atributos) : item.atributos,
    activo !== undefined ? (activo ? 1 : 0) : item.activo,
    req.params.id
  );

  const actualizado = db.prepare("SELECT * FROM items WHERE id = ?").get(req.params.id);
  res.json({ ...actualizado, atributos: JSON.parse(actualizado.atributos), activo: actualizado.activo === 1 });
});

// DELETE /api/items/:id
router.delete("/:id", (req, res) => {
  const item = db.prepare("SELECT * FROM items WHERE id = ?").get(req.params.id);
  if (!item) return res.status(404).json({ error: "No encontrado" });

  db.prepare("DELETE FROM items WHERE id = ?").run(req.params.id);
  res.json({ mensaje: "Eliminado correctamente" });
});

// POST /api/items/:id/registro
router.post("/:id/registro", (req, res) => {
  const item = db.prepare("SELECT * FROM items WHERE id = ?").get(req.params.id);
  if (!item) return res.status(404).json({ error: "Item no encontrado" });

  const { detalle } = req.body;

  const resultado = db.prepare(`
    INSERT INTO registros (itemId, fecha, detalle)
    VALUES (?, ?, ?)
  `).run(req.params.id, new Date().toISOString().split("T")[0], detalle || "");

  res.status(201).json({
    id: resultado.lastInsertRowid,
    itemId: req.params.id,
    fecha: new Date().toISOString().split("T")[0],
    detalle: detalle || "",
  });
});

module.exports = router;