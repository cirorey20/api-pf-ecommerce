import express, { Router } from "express";
import {
  getCategories,
  createCategories,
} from "../../controller/category.controller";

const router: Router = express.Router();

router.get("/", getCategories);
router.post("/createCategories", createCategories);

export default router;
