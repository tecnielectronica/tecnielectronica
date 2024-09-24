import { Router } from "express";
const router = Router();

import * as entradasCtrl from '../controllers/entrada.controller';
import { isAdmin, isModerator, verifyToken } from "../middlewares/authJwt";

router.post('/', [isModerator, verifyToken], entradasCtrl.createEntrada);
router.get('/', entradasCtrl.getEntradas);
router.get('/pagination', entradasCtrl.getEntradaPaginations);
router.get('/:search', entradasCtrl.getSearchEntrada);
router.get('/inventario/:searchInventario', entradasCtrl.getSearchConsultaInventario);
router.put('/:entradaId', [isModerator, verifyToken], entradasCtrl.updateEntradaById);
router.delete('/:entradaId', [isModerator, verifyToken], entradasCtrl.deleteEntradaById);

export default router;