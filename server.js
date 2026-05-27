const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const consultoriosRoutes = require("./routes/consultorios");
const pacientesRoutes = require("./routes/pacientes");
const citasRoutes = require("./routes/citas");
const medicosRoutes = require("./routes/medicos");

app.use("/api/pacientes", pacientesRoutes);
app.use("/api/citas", citasRoutes);
app.use("/api/medicos", medicosRoutes);
app.use("/api/consultorios", consultoriosRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});