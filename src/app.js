import express from "express";
import cors from "cors";
import path from "path";

import entradaRoutes from "./routes/entrada.routes";
import salidaRoutes from "./routes/salida.routes";
import inventarioRoutes from "./routes/inventario.routes";
import outStoreRoutes from "./routes/outStore.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import rolRoutes from "./routes/rol.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/inventario", inventarioRoutes);
app.use("/outStore", outStoreRoutes);
app.use("/entradas", entradaRoutes);
app.use("/salida", salidaRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/rol", rolRoutes);

// Side Server

app.use(
  express.static(path.resolve(__dirname, "tecni-electronica", "dist"))
);
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "tecni-electronica", "dist", "index.html"));
});

export default app;
