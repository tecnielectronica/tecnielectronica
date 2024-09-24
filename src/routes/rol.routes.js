import { Router } from "express";
const router = Router();

import * as rolCrtl from "../controllers/rol.controller";

router.get('/:rolId', rolCrtl.getRoleById);

export default router;