const db = require("../db");

// GET
const obtenerPacientes = (req, res) => {
  db.query("SELECT * FROM pacientes", (error, resultados) => {
    if (error) return res.status(500).json(error);

    res.json(resultados);
  });
};

// POST
const crearPaciente = (req, res) => {
  const { nombre, correo, telefono, eps, genero, direccion } = req.body;

  const sql = `
    INSERT INTO pacientes
    (nombre, correo, telefono, eps, genero, direccion)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, correo, telefono, eps, genero, direccion],
    (error, resultado) => {
      if (error) return res.status(500).json(error);

      res.json({
        mensaje: "Paciente creado",
      });
    }
  );
};

// PUT
const actualizarPaciente = (req, res) => {
  const id = req.params.id;

  const { nombre, correo, telefono, eps, genero, direccion } = req.body;

  const sql = `
    UPDATE pacientes
    SET nombre=?, correo=?, telefono=?, eps=?, genero=?, direccion=?
    WHERE id=?
  `;

  db.query(
    sql,
    [nombre, correo, telefono, eps, genero, direccion, id],
    (error, resultado) => {
      if (error) return res.status(500).json(error);

      res.json({
        mensaje: "Paciente actualizado",
      });
    }
  );
};

// DELETE
const eliminarPaciente = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM pacientes WHERE id=?",
    [id],
    (error, resultado) => {
      if (error) return res.status(500).json(error);

      res.json({
        mensaje: "Paciente eliminado",
      });
    }
  );
};

module.exports = {
  obtenerPacientes,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
};