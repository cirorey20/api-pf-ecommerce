import express, { Router } from "express";
import { getCategories } from "../../controller/category.controller";

const router:Router = express.Router();

router.get("/", getCategories);


export default router;