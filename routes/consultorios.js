const express = require("express");
const router = express.Router();

const db = require("../db");


// OBTENER CONSULTORIOS
router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM consultorios",
    (err, result) => {

      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    }
  );

});


// CREAR CONSULTORIO
router.post("/", (req, res) => {

  const {
    numero,
    torre,
    piso,
    estado
  } = req.body;

  const sql = `
    INSERT INTO consultorios
    (
      numero,
      torre,
      piso,
      estado
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      numero,
      torre,
      piso,
      estado
    ],
    (err, result) => {

      if (err) {

        console.log(err);

        res.status(500).json(err);

      } else {

        res.json({
          mensaje: "Consultorio creado correctamente"
        });

      }
    }
  );

});


// ACTUALIZAR
router.put("/:id", (req, res) => {

  const { id } = req.params;

  const {
    numero,
    torre,
    piso,
    estado
  } = req.body;

  const sql = `
    UPDATE consultorios
    SET
      numero=?,
      torre=?,
      piso=?,
      estado=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      numero,
      torre,
      piso,
      estado,
      id
    ],
    (err, result) => {

      if (err) {

        console.log(err);

      } else {

        res.json({
          mensaje: "Consultorio actualizado"
        });

      }
    }
  );

});


// ELIMINAR
router.delete("/:id", (req, res) => {

  const { id } = req.params;

  db.query(
    "DELETE FROM consultorios WHERE id=?",
    [id],
    (err, result) => {

      if (err) {

        console.log(err);

      } else {

        res.json({
          mensaje: "Consultorio eliminado"
        });

      }
    }
  );

});

module.exports = router;