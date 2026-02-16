import { Router } from "express";
import * as controller from "./user.controller";
import auth from "../../middlewares/auth";
import { requireRole } from "../../middlewares/requireRole";

const router = Router();

/**
 * 내 정보 (로그인 필요)
 * GET  /api/users/me
 * PATCH /api/users/me
 */
router.get("/me", auth, controller.me);
router.patch("/me", auth, controller.updateMe);

/**
 * 관리자 유저 관리
 * GET /api/users?page=1&limit=10
 * GET /api/users/:id
 */

router.get("/", auth, requireRole("admin"), controller.list);
router.get("/:id", auth, requireRole("admin"), controller.getById);

export default router;
