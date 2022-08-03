// const express = require('express');
import express, { Router } from "express";
const router: Router = express.Router();

import {
  getProducts,
  createProducts,
  //deleteProducts,
} from "../../controller/product.controller";

router.get("/", getProducts);
router.post("/createProducts", createProducts);
//router.delete("/deleteProducts/:id", deleteProducts);
export default router;
