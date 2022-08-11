// const express = require('express');
import express, { Router } from "express";
const router: Router = express.Router();
import { checkRoleAuth, checkAuth } from "../../middlewares/autho";
import {
  getProducts,
  createProducts,
  getProductById,
  updateProduct,
  //deleteProducts,
} from "../../controller/product.controller";

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/createProducts", createProducts);
router.put("/updateProduct", checkAuth, checkRoleAuth, updateProduct);
//router.delete("/deleteProducts/:id", deleteProducts);
export default router;
//checkAuth, checkRoleAuth,
