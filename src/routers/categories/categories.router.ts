import express, { Router } from "express";
import {
  getCategories,
  createCategories,
  generateCategories
} from "../../controller/category.controller";
import { checkRoleAuth, checkAuth } from "../../middlewares/autho";

const router: Router = express.Router();

//crear categorias automaticamente
router.get("/generateCategories", generateCategories);

router.get("/", getCategories);
router.post("/createCategories", checkAuth, checkRoleAuth, createCategories);

export default router;
