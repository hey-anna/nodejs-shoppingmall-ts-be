import mongoose, { Schema, Document, Types } from "mongoose";

export interface IShipTo {
  recipient: string; // 받는 사람
  address1: string; // 기본 주소
  address2?: string; // 상세 주소
  zipcode: string; // 우편번호
  message?: string; // 배송 메모
}

export interface IContact {
  name: string;
  phone: string;
  email?: string;
}

export interface IOrderItem {
  productId: Types.ObjectId;
  qty: number;
  size: string;
  price: number; // 주문 당시 가격(상품 가격이 바뀌어도 주문 기록은 유지)
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  status: "preparing" | "paid" | "shipped" | "delivered" | "cancelled";
  totalPrice: number;

  shipTo: IShipTo;
  contact: IContact;

  orderNum?: string;
  items: IOrderItem[];

  createdAt: Date;
  updatedAt: Date;
}

const shipToSchema = new Schema<IShipTo>(
  {
    recipient: { type: String, required: true, trim: true },
    address1: { type: String, required: true, trim: true },
    address2: { type: String, trim: true },
    zipcode: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
  },
  { _id: false },
);

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
  },
  { _id: false },
);

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    size: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    status: {
      type: String,
      enum: ["preparing", "paid", "shipped", "delivered", "cancelled"],
      default: "preparing",
    },

    totalPrice: { type: Number, required: true, default: 0, min: 0 },

    shipTo: { type: shipToSchema, required: true },
    contact: { type: contactSchema, required: true },

    orderNum: { type: String },

    items: {
      type: [orderItemSchema],
      required: true,
      default: [],
      validate: {
        validator: (v: unknown[]) => Array.isArray(v) && v.length > 0,
        message: "Order items must have at least one item.",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret: any) => {
        delete ret.__v;
        delete ret.updatedAt;
        return ret;
      },
    },
  },
);

export default mongoose.model<IOrder>("Order", orderSchema);
