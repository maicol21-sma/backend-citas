const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM medicos",
    (err, result) => {

      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.post("/", (req, res) => {

  const {
    nombre,
    especialidad,
    telefono,
    correo
  } = req.body;

  const sql = `
    INSERT INTO medicos
    (nombre, especialidad, telefono, correo)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nombre,
      especialidad,
      telefono,
      correo
    ],
    (err, result) => {

      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          mensaje: "Médico creado correctamente"
        });
      }
    }
  );
});
const {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} = require("../controllers/medicosController");

router.get("/", obtenerMedicos);

router.post("/", crearMedico);

router.put("/:id", actualizarMedico);

router.delete("/:id", eliminarMedico);

module.exports = router;
module.exports = router;