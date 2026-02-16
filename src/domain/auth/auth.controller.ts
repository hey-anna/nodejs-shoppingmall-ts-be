import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/apiError";
import * as authService from "./auth.service";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password)
    throw new ApiError(400, "필수 입력값이 누락되었습니다.");

  const user = await authService.signup({ email, name, password });

  res.status(201).json({ message: "회원가입 성공", id: user._id });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new ApiError(400, "이메일/비밀번호를 입력해 주세요.");

  const data = await authService.login({ email, password });

  res.status(200).json({ message: "로그인 성공", ...data });
});

export const logout = (_req: Request, res: Response) => {
  res.json({ message: "로그아웃 성공" });
};
