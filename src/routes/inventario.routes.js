import { Router } from "express";
const router = Router();

import * as inventarioCtrl from "../controllers/inventario.controller";
import { isAdmin, verifyToken } from "../middlewares/authJwt";

router.post("/",[isAdmin, verifyToken], inventarioCtrl.createInventario);
router.get("/", inventarioCtrl.getInventarios);
router.get("/pagination", inventarioCtrl.getInventarioPaginations);
router.get("/:search", inventarioCtrl.getSearchInventario);
router.put("/:inventarioId", [isAdmin, verifyToken], inventarioCtrl.updateInventarioById);
router.delete("/:inventarioId", [isAdmin, verifyToken], inventarioCtrl.deleteInventarioById);

export default router;