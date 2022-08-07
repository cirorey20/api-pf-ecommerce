// const express = require('express');
import express, { Router } from "express";
const router: Router = express.Router();

import {
  getProducts,
  createProducts,
  getProductById,
  updateProduct,
  nameProducts
  //deleteProducts,
} from "../../controller/product.controller";

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/createProducts", createProducts);
router.put("/updateProduct", updateProduct);
router.get("/search", nameProducts);
//router.delete("/deleteProducts/:id", deleteProducts);
export default router;
