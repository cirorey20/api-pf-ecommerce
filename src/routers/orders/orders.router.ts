import express, { Router } from "express";
import {
  checkout,
  getOrderById,
  getOrders,
  getOrdersByUser,
  getOrdersStates,
  setOrderState
} from "../../controller/order.controller";

const router: Router = express.Router();
router.get('/states', getOrdersStates);
router.get("/", getOrders);
router.get("/:idOrder", getOrderById);
router.post('/setState', setOrderState);
router.get("/user/:idUser", getOrdersByUser);
router.post("/checkout", checkout);

export default router;
