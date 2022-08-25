import express, { Router } from "express";
import {
  getCategories,
  createCategories,
  generateCategories,
  updateCategory
} from "../../controller/category.controller";
import { checkRoleAuth, checkAuth } from "../../middlewares/autho";

const router: Router = express.Router();

//crear categorias automaticamente
router.get("/generateCategories", generateCategories);

router.get("/", getCategories);
router.post("/createCategories", checkAuth, checkRoleAuth, createCategories);
// router.put("/updateCategory", updateCategory);
router.post("/updateCategory", checkAuth, checkRoleAuth, updateCategory);
export default router;
