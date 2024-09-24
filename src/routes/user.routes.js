import { Router } from "express";
import { createUser, getUserByUsername } from '../controllers/user.controller';
import { isAdmin, verifyToken } from '../middlewares/authJwt';
import { checkExistingUsername } from "../middlewares/verifySignUp";

const router = Router();

router.post("/", [verifyToken, isAdmin], createUser);
router.get("/:username", getUserByUsername);

export default router;