import { Router } from "express";
import * as authController from "./auth.controller";
// import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
