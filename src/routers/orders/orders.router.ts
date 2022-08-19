import express, { Router } from "express";
import {
  checkout,
  getOrderById,
  getOrders,
  getOrdersByUser,
} from "../../controller/order.controller";

const router: Router = express.Router();

router.get("/", getOrders);
router.get("/:idOrder", getOrderById);
router.get("/user/:idUser", getOrdersByUser);
router.post("/checkout", checkout);

export default router;
