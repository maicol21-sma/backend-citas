const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM pacientes", (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

router.post("/", (req, res) => {
  const { nombre, correo, telefono, eps, genero, direccion } = req.body;

  const sql = `
    INSERT INTO pacientes
    (nombre, correo, telefono, eps, genero, direccion)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, correo, telefono, eps, genero, direccion],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          mensaje: "Paciente creado"
        });
      }
    }
  );
});
const {
  obtenerPacientes,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} = require("../controllers/pacientesController");

router.get("/", obtenerPacientes);

router.post("/", crearPaciente);

router.put("/:id", actualizarPaciente);

router.delete("/:id", eliminarPaciente);

module.exports = router;