import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string; // OAuth 사용 시 없을 수 있음
  name: string;
  role: "customer" | "admin";
  provider?: string;
  providerId?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, select: false },
    name: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    provider: String,
    providerId: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;

        // mongoose 기본 _id -> id로 바꾸고 싶으면 (선택)
        // ret.id = ret._id;
        // delete ret._id;

        return ret;
      },
    },
  },
);

export default mongoose.model<IUser>("User", userSchema);
