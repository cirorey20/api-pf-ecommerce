import express, { Router } from "express";
import { checkout, getOrderById, getOrders } from "../../controller/order.controller";

const router:Router = express.Router();

router.get('/', getOrders);
router.get('/:idOrder', getOrderById);
router.post('/checkout', checkout);


export default router;

