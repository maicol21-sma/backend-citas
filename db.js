const mysql = require("mysql2");

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mai.mel21",
  database: "gestion_citas",
});

conexion.connect((error) => {
  if (error) {
    console.log("Error de conexión:", error);
  } else {
    console.log("Conexión exitosa a MySQL");
  }
});

module.exports = conexion; 