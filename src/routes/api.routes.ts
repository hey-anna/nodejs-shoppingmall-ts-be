import { Router } from "express";

import authRoutes from "../domain/auth/auth.routes";
import userRoutes from "../domain/user/user.routes";
// import productRoutes from "../domain/product/product.routes";
// import orderRoutes from "../domain/order/order.routes";

const router = Router();

// 도메인별 라우트 묶기
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

// router.use("/products", productRoutes);
// router.use("/orders", orderRoutes);

// router.use("/admin/products", productAdminRoutes);
// router.use("/admin/orders", orderAdminRoutes);
// router.use("/admin/users", userAdminRoutes);

export default router;
