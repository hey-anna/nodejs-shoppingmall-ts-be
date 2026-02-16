import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ApiError } from "../utils/apiError";

type JwtPayload = {
  sub: string; // userId
  role: "customer" | "admin";
  email?: string;
  name?: string;
};

export default function auth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer "))
    throw new ApiError(401, "로그인이 필요합니다.");

  const token = header.slice("Bearer ".length);

  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    return next(new ApiError(500, "JWT_SECRET_KEY가 설정되지 않았습니다."));
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!mongoose.isValidObjectId(decoded.sub)) {
      return next(new ApiError(401, "토큰이 유효하지 않습니다."));
    }

    req.user = {
      _id: new mongoose.Types.ObjectId(decoded.sub),
      role: decoded.role,
      email: decoded.email,
      name: decoded.name,
    };

    return next();
  } catch {
    return next(new ApiError(401, "토큰이 유효하지 않습니다."));
  }
}
