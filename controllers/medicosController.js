const db = require("../db");

// GET
const obtenerMedicos = (req, res) => {
  db.query("SELECT * FROM medicos", (error, resultados) => {
    if (error) return res.status(500).json(error);

    res.json(resultados);
  });
};

// POST
const crearMedico = (req, res) => {
  const { nombre, especialidad, telefono, correo } = req.body;

  const sql = `
    INSERT INTO medicos
    (nombre, especialidad, telefono, correo)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, especialidad, telefono, correo],
    (error, resultado) => {
      if (error) return res.status(500).json(error);

      res.json({
        mensaje: "Médico creado",
      });
    }
  );
};

// PUT
const actualizarMedico = (req, res) => {
  const id = req.params.id;

  const { nombre, especialidad, telefono, correo } = req.body;

  const sql = `
    UPDATE medicos
    SET nombre=?, especialidad=?, telefono=?, correo=?
    WHERE id=?
  `;

  db.query(
    sql,
    [nombre, especialidad, telefono, correo, id],
    (error, resultado) => {
      if (error) return res.status(500).json(error);

      res.json({
        mensaje: "Médico actualizado",
      });
    }
  );
};

// DELETE
const eliminarMedico = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM medicos WHERE id=?",
    [id],
    (error, resultado) => {
      if (error) return res.status(500).json(error);

      res.json({
        mensaje: "Médico eliminado",
      });
    }
  );
};

module.exports = {
  obtenerMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
};