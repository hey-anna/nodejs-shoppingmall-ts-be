import { Request, Response } from "express";
import * as userService from "./user.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/apiError";

// GET /api/users/me
export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "로그인이 필요합니다.");
  const user = await userService.getMe(req.user._id);
  res.json({ user });
});

// PATCH /api/users/me
export const updateMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "로그인이 필요합니다.");
  const user = await userService.updateMe(req.user._id, {
    name: req.body?.name,
  });
  res.json({ message: "수정 완료", user });
});

// (Admin) GET /api/users
export const list = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(1, Number(req.query.page ?? 1));
  const limit = Math.min(50, Math.max(1, Number(req.query.limit ?? 10)));

  const data = await userService.listUsers({ page, limit });
  res.json(data);
});

// (Admin) GET /api/users/:id
export const getById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    // params에서 id를 뽑으며 string임을 명시
    // const { id } = req.params as { id: string };
    // const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = req.params.id;
    const user = await userService.getUserById(id);
    res.json({ user });
  },
);
