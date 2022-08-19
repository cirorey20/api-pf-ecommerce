// const express = require('express');
import express, { Router } from "express";
const router: Router = express.Router();
import { checkRoleAuth, checkAuth } from "../../middlewares/autho";
import {
     getReviews,
     addReview,
//   getReviewByName,
//   updateReview,
  //deleteProducts,
} from "../../controller/review.controller";

router.get("/", getReviews);
// router.get("/:id", getReviewByName);
router.post("/addReview", addReview);
// router.put("/updateReview", checkAuth, checkRoleAuth, updateReview);
//router.delete("/deleteProducts/:id", deleteProducts);
export default router;
//checkAuth, checkRoleAuth,

