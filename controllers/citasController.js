const db = require("../db");

// GET
const obtenerCitas = (req, res) => {
  db.query("SELECT * FROM citas", (error, resultados) => {
    if (error) return res.status(500).json(error);

    res.json(resultados);
  });
};

// POST
const crearCita = (req, res) => {
  const { paciente_id, medico_id, fecha, hora, motivo } = req.body;

  const sql = `
    INSERT INTO citas
    (paciente_id, medico_id, fecha, hora, motivo)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [paciente_id, medico_id, fecha, hora, motivo],
    (error, resultado) => {
      if (error) return res.status(500).json(error);

      res.json({
        mensaje: "Cita creada",
      });
    }
  );
};

// PUT
const actualizarCita = (req, res) => {
  const id = req.params.id;

  const { paciente_id, medico_id, fecha, hora, motivo } = req.body;

  const sql = `
    UPDATE citas
    SET paciente_id=?, medico_id=?, fecha=?, hora=?, motivo=?
    WHERE id=?
  `;

  db.query(
    sql,
    [paciente_id, medico_id, fecha, hora, motivo, id],
    (error, resultado) => {
      if (error) return res.status(500).json(error);

      res.json({
        mensaje: "Cita actualizada",
      });
    }
  );
};

// DELETE
const eliminarCita = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM citas WHERE id=?",
    [id],
    (error, resultado) => {
      if (error) return res.status(500).json(error);

      res.json({
        mensaje: "Cita eliminada",
      });
    }
  );
};

module.exports = {
  obtenerCitas,
  crearCita,
  actualizarCita,
  eliminarCita,
};