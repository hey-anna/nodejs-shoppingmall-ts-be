import { Request, Response, NextFunction } from "express";
import { Role } from "../constants/roles";
import { ApiError } from "../utils/apiError";

export const requireRole = (role: Role) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "로그인이 필요합니다."));
    if (req.user.role !== role)
      return next(new ApiError(403, "권한이 없습니다."));
    return next();
  };
};
