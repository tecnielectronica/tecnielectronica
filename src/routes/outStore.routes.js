import { Router } from "express";
const router = Router();

import * as outStoreCtrl from "../controllers/outStore.controller";
import { isAdmin, verifyToken } from "../middlewares/authJwt";

router.post("/", [isAdmin], outStoreCtrl.createOutStore);
router.get("/pagination", outStoreCtrl.getOutStorePaginations);
router.get("/:search", outStoreCtrl.getSearchOutStore);
router.put("/:outStoreId", [isAdmin, verifyToken], outStoreCtrl.updateOutStore);
router.delete("/:outStoreId", [isAdmin, verifyToken], outStoreCtrl.deleteOutStore);

export default router;