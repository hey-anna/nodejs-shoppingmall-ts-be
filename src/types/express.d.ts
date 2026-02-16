// src/types/express.d.ts
import { Types } from "mongoose";
import type { Role } from "../constants/roles";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId;
        role: Role;
        email?: string;
        name?: string;
      };
    }
  }
}

export {};
