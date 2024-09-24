import { Router } from "express";
const router = Router();

import * as salidaCtrl from "../controllers/salida.controller";
import { isAdmin, isModerator, verifyToken } from "../middlewares/authJwt";

router.post("/", [isModerator, verifyToken], salidaCtrl.createSalida);
router.get("/", salidaCtrl.getSalidas);
router.get("/pagination", salidaCtrl.getSalidasPaginations);
router.get("/:search", salidaCtrl.getSearchSalida);
router.get("/inventario/:searchInventario", salidaCtrl.getSearchConsultaInventario);
router.get("/dateCurrent", salidaCtrl.getSearchDateCurrentSalidas);
router.put("/:salidaId", [isModerator, verifyToken], salidaCtrl.updateSalidaById);
router.delete("/:salidaId", [isModerator, verifyToken], salidaCtrl.deleteSalidaById);

export default router;