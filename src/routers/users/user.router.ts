// const express = require('express');
import express, { Router } from "express";
const router: Router = express.Router();
import { checkRoleAuth, checkAuth } from "../../middlewares/autho";
import {
  getUsers,
  createUser,
  login,
  updateUser,
  promote,
  loginGoogle,
} from "../../controller/user.controller";
//usamos midlewares para comparar el rol y si esta logueado
router.get("/", checkAuth, checkRoleAuth, getUsers);
router.post("/createUsers", createUser);
router.post("/login", login);
router.post("/loginGoogle", loginGoogle);
router.put("/updateUser/:id", checkAuth, updateUser);
router.post("/promote/:id", checkAuth, checkRoleAuth, promote);

export default router;
