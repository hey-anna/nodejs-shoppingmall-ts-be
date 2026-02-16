import { Types } from "mongoose";
import User from "./user.model";
import { ApiError } from "../../utils/apiError";

const SALT_ROUNDS = 10;

export async function getMe(userId: Types.ObjectId) {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new ApiError(404, "사용자를 찾을 수 없습니다.");
  return user;
}

export async function updateMe(
  userId: Types.ObjectId,
  payload: { name?: string },
) {
  // 필요한 필드만 허용(화이트리스트)
  const update: { name?: string } = {};
  const trimmed = payload.name?.trim();
  if (trimmed) update.name = trimmed;
  if (typeof payload.name === "string") update.name = payload.name.trim();

  if (Object.keys(update).length === 0) {
    throw new ApiError(400, "수정할 값이 없습니다.");
  }

  const user = await User.findByIdAndUpdate(userId, update, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) throw new ApiError(404, "사용자를 찾을 수 없습니다.");
  return user;
}

// (Admin) 유저 목록
export async function listUsers(params: { page: number; limit: number }) {
  const { page, limit } = params;
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    User.countDocuments(),
  ]);

  return { items, total, page, limit };
}

// (Admin) 특정 유저 조회
export async function getUserById(id: string) {
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new ApiError(400, "유효하지 않은 user id 입니다.");
  }
  const user = await User.findById(id).select("-password");
  if (!user) throw new ApiError(404, "사용자를 찾을 수 없습니다.");
  return user;
}
