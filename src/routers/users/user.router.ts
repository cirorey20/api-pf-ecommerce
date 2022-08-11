// const express = require('express');
import express, { Router } from "express";
import routerApi from "..";
const router: Router = express.Router();

import { getUsers, createUser } from "../../controller/user.controller";

router.get("/", getUsers);
router.post("/create", createUser);

export default router;
