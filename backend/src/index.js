// src/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const itemsRouter = require("./routes/items");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use("/api/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});