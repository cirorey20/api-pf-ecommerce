import express, { Router } from "express";
import { checkout, getOrders } from "../../controller/order.controller";

const router:Router = express.Router();

router.get('/', getOrders);
router.post('/checkout', checkout)


export default router;

