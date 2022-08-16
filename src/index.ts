// const express = require('express');
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config();

import Stripe from "stripe";

// const routerApi = require('./routers');
import routerApi from "./routers/index";

// const { logError, errorHandler } = require('./middlewares/error.handler.js');
import { logError, errorHandler } from "./middlewares/error.handler";

const app: Express = express();
const port: number = 3001;

app.use(express.json());

//aca vamos a poner los cors

app.use((req: Request, res: Response, next: NextFunction): void => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Origin", "https://universalmusic-henry.web.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

//aca mostrando la ruta principal
app.get("/", (req: Request, res: Response): void => {
  res.send("Esta funcionando correctamente!");
});

//aca utilizamos la funcion que contiene todas las rutas
routerApi(app); //y pasamos app como argumento

//aca queremos poner los middleware de errores
app.use(logError);
app.use(errorHandler);

//////////////////////////////
const stripe = new Stripe("sk_test_51LUuaPGOqvRgizQ9MjapMBUmqYBnQzTuvRRkhH2vRh65om1regbCAn9dsvOIG61xxa9kbA8hnNk2NqozaQ91W1mA00ieJAWgCf",  {
  apiVersion: '2022-08-01',
})
app.post("/api/checkout", async (req: any, res: any) => {
  const {id,stateCart,allQuantity,allToPay} = req.body
  
  const payments = await stripe.paymentIntents.create({
    amount: allToPay,
    currency: "USD",
    description: "stateCart",
    payment_method: id,
    confirm: true,
  })
  console.log(payments)
    res.send({message:'Successfull payment'})
});

//por ultimo el puerto por donde escucha
app.listen(process.env.PORT || port, (): void => {
  // console.log(`DATAURL ${process.env.DATABASE_URL}`);
  console.log(`Utilizando el puerto ${port}`);
});
