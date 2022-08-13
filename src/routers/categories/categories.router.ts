import express, { Router } from "express";
import {
  getCategories,
  createCategories,
} from "../../controller/category.controller";
import { checkRoleAuth, checkAuth } from "../../middlewares/autho";

const router: Router = express.Router();

router.get("/", getCategories);
router.post("/createCategories", checkAuth, checkRoleAuth, createCategories);

export default router;
