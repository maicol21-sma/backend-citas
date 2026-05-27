const express = require("express");

const router = express.Router();

const db = require("../db");


// =============================
// OBTENER CITAS
// =============================
router.get("/", (req, res) => {

  const sql = `

    SELECT

      citas.id,

      citas.paciente_id,
      citas.medico_id,
      citas.consultorio_id,

      pacientes.nombre AS paciente,

      medicos.nombre AS medico,

      consultorios.numero AS consultorio,

      citas.fecha,
      citas.hora,
      citas.estado

    FROM citas

    INNER JOIN pacientes
      ON citas.paciente_id = pacientes.id

    INNER JOIN medicos
      ON citas.medico_id = medicos.id

    INNER JOIN consultorios
      ON citas.consultorio_id = consultorios.id

  `;

  db.query(sql, (err, results) => {

    if (err) {

      console.log(err);

      return res.status(500).json(err);

    }

    res.json(results);

  });

});


// =============================
// CREAR CITA
// =============================
router.post("/", (req, res) => {

  const {

    paciente_id,
    medico_id,
    consultorio_id,

    fecha,
    hora,

    estado

  } = req.body;


  const sql = `

    INSERT INTO citas

    (
      paciente_id,
      medico_id,
      consultorio_id,
      fecha,
      hora,
      estado
    )

    VALUES (?, ?, ?, ?, ?, ?)

  `;


  db.query(

    sql,

    [

      paciente_id,
      medico_id,
      consultorio_id,

      fecha,
      hora,

      estado

    ],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json(err);

      } else {

        res.json({

          mensaje: "Cita guardada"

        });

      }

    }

  );

});
router.put("/:id", (req, res) => {

  const { paciente_id, medico_id, consultorio_id, fecha, hora, estado } = req.body;

  const sql = `

    UPDATE citas
    SET

      paciente_id = ?,
      medico_id = ?,
      consultorio_id = ?,
      fecha = ?,
      hora = ?,
      estado = ?

    WHERE id = ?

  `;

  db.query(

    sql,

    [
      paciente_id,
      medico_id,
      consultorio_id,
      fecha,
      hora,
      estado,
      req.params.id
    ],

    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);

      }

      res.json(result);

    }

  );

});

// =============================
// ELIMINAR
// =============================
router.delete("/:id", (req, res) => {

  const sql = `
    DELETE FROM citas
    WHERE id = ?
  `;

  db.query(

    sql,

    [req.params.id],

    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json(err);

      } else {

        res.json({

          mensaje: "Cita eliminada"

        });

      }

    }

  );

});


module.exports = router;