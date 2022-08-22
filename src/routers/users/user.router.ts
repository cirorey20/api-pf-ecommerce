// const express = require('express');
import express, { Router } from "express";
import sequelize from "../../config/sequelize";
const router: Router = express.Router();
const { Users, Address } = sequelize.models;
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
  authenticateAccount,
  updateAddress,
} from "../../controller/user.controller";
//usamos midlewares para comparar el rol y si esta logueado
router.get("/", checkAuth, checkRoleAuth, getUsers);
router.post("/createUsers", createUser);
router.post("/login", login);
router.post("/loginGoogle", loginGoogle);
router.get("/getUserLogin", checkAuth, getUserLogin);
router.put("/updateUser/:id", updateUser);
router.put("/updateAddress/:idAddress", updateAddress);
router.post("/promote/:id", promote);
router.post("/banend/:id", banend);
router.post("/desbaned/:id", desbaned);
router.post("/authenticateAccount", authenticateAccount);

router.post("/createAdmin", async (req, res) => {
  try {
    let address = await Address.create();
    const dbAdmin = await Users.findOne({
      where: {
        email: "admin@admin.com",
      },
    });
    if (dbAdmin) return res.status(200).send("Ya existe el admin");

    const admin = await Users.create({
      name: "Admin",
      last_name: "Admin",
      rol: "admin",
      email: "admin@admin.com",
      password: "admin",
      authenticated: true,
      AddressId: address.toJSON().id,
    });
    return res.send("Admin creado");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error en el servidor");
  }
});

export default router;
