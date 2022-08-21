// const express = require('express');
import express, { Router } from "express";
import sequelize from "../../config/sequelize";
const router: Router = express.Router();
const { Users } = sequelize.models;
import { checkRoleAuth, checkAuth } from "../../middlewares/autho";
import {
  getUsers,
  createUser,
  login,
  updateUser,
  promote,
  loginGoogle,
  getUserLogin,
  banend,
  desbaned,
} from "../../controller/user.controller";
//usamos midlewares para comparar el rol y si esta logueado
router.get("/", checkAuth, checkRoleAuth, getUsers);
router.post("/createUsers", createUser);
router.post("/login", login);
router.post("/loginGoogle", loginGoogle);
router.get("/getUserLogin", checkAuth, getUserLogin);
router.put("/updateUser/:id", checkAuth, updateUser);
router.post("/promote/:id", promote);
router.post("/banend/:id", banend);
router.post("/desbaned/:id", desbaned);

router.post("/createAdmin", async (req, res) => {
  try {
    const admin = await Users.create({
      name: "Admin",
      last_name: "Admin",
      rol: "admin",
      email: "admin@admin.com",
      password: "admin",
    });
    return res.send("Admin creado");
  } catch (error) {
    return res.status(400).send("Ya existe el admin");
  }
});

export default router;
