// const express = require('express');
import express, { Router } from "express";
const router: Router = express.Router();
import { checkRoleAuth, checkAuth } from "../../middlewares/autho";
import {
  getProducts,
  createProducts,
  getProductById,
  updateProduct,
  banend,
  desbaned,
  //deleteProducts,
} from "../../controller/product.controller";

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/createProducts", createProducts);
router.put("/updateProduct", checkAuth, checkRoleAuth, updateProduct);
router.post("/banend/:id", banend);
router.post("/desbaned/:id", desbaned);
//router.delete("/deleteProducts/:id", deleteProducts);
export default router;
//checkAuth, checkRoleAuth,
