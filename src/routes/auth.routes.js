import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller";
import { 
  checkExistingRole,
  checkExistingUsername
 } from '../middlewares/verifySignUp';
const router = Router();

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/signup", signup);
router.post("/signin", signin);

export default router;