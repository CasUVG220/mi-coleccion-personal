const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "../../entrenamiento.sqlite"));

db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    categoriaId TEXT NOT NULL,
    estado TEXT NOT NULL,
    puntuacion INTEGER NOT NULL,
    fechaRegistro TEXT NOT NULL,
    fechaActividad TEXT NOT NULL,
    notas TEXT,
    atributos TEXT NOT NULL,
    activo INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    itemId TEXT NOT NULL,
    fecha TEXT NOT NULL,
    detalle TEXT,
    FOREIGN KEY (itemId) REFERENCES items(id)
  );
`);

module.exports = db;
