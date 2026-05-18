const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

  const sql = `
    SELECT
      citas.id,
      pacientes.nombre AS paciente,
      medicos.nombre AS medico,
      medicos.especialidad,
      citas.fecha,
      citas.hora,
      citas.motivo,
      citas.estado

    FROM citas

    INNER JOIN pacientes
    ON citas.paciente_id = pacientes.id

    INNER JOIN medicos
    ON citas.medico_id = medicos.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

router.post("/", (req, res) => {

  const {
    paciente_id,
    medico_id,
    fecha,
    hora,
    motivo,
    estado
  } = req.body;

  const sql = `
    INSERT INTO citas
    (paciente_id, medico_id, fecha, hora, motivo, estado)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      paciente_id,
      medico_id,
      fecha,
      hora,
      motivo,
      estado
    ],
    (err, result) => {

      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          mensaje: "Cita creada correctamente"
        });
      }
    }
  );
});
const {
  obtenerCitas,
  crearCita,
  actualizarCita,
  eliminarCita,
} = require("../controllers/citasController");

router.get("/", obtenerCitas);

router.post("/", crearCita);

router.put("/:id", actualizarCita);

router.delete("/:id", eliminarCita);

module.exports = router;