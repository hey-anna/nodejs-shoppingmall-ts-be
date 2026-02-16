import bcrypt from "bcryptjs";
import User from "../user/user.model";
import { ApiError } from "../../utils/apiError";

const SALT_ROUNDS = 10;

export async function signup(payload: {
  email: string;
  name: string;
  password: string;
}) {
  const email = payload.email.trim().toLowerCase();
  const name = payload.name.trim();
  const password = payload.password;

  // 1) 중복 체크
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "이미 가입된 이메일입니다.");

  // 2) 해싱
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // 3) 저장 (+ E11000 방어)
  try {
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
      role: "customer",
    });
    return user;
  } catch (err: any) {
    if (err?.code === 11000)
      throw new ApiError(409, "이미 가입된 이메일입니다.");
    throw err;
  }
}

export async function login(payload: { email: string; password: string }) {
  const email = payload.email.trim().toLowerCase();
  const password = payload.password;

  const user = await User.findOne({ email }).select("+password");
  if (!user)
    throw new ApiError(401, "이메일 또는 비밀번호가 올바르지 않습니다.");

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch)
    throw new ApiError(401, "이메일 또는 비밀번호가 올바르지 않습니다.");

  const token = (user as any).generateToken?.() ?? null;

  return {
    token,
    user: { id: user._id, email: user.email, name: user.name, role: user.role },
  };
}
