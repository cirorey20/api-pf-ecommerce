// const express = require('express');
import express, { Express, Request, Response, NextFunction } from "express";
import Stripe from "stripe";

// const routerApi = require('./routers');
import routerApi from "./routers/index";

// const { logError, errorHandler } = require('./middlewares/error.handler.js');
import { logError, errorHandler } from "./middlewares/error.handler";

const app: Express = express();
const port: number = 3001;

app.use(express.json());

//Exponer archivos estaticos
app.use('/static', express.static(__dirname + '/../public'));

//aca vamos a poner los cors

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
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
/* const stripe = new Stripe("sk_test_51LVJYJHeLDBhzI8LRqnDcuTe8SAf6469CL5sSQg4HVIdbxl0gnaAaPsh6Oid7ayevw1pBoZ3CSvjagcggxFKjeV20016PkydCA", {
  apiVersion: '2022-08-01',
})
app.post("/api/checkout", async (req: any, res: any) => {
  try{
    const { id, stateCart, allQuantity, allToPay } = req.body
    console.log(allToPay)
      const payments = await stripe.paymentIntents.create({
        amount: allToPay,
        currency: "USD",
        description: "stateCart",
        payment_method: id,
        confirm: true,
      })
      console.log(payments)
  }catch(error){
    console.log(error)
  }
  var estado = true
  res.send({ message: 'Successfull payment', estado })
}); */

//por ultimo el puerto por donde escucha
app.listen(port, (): void => {
  console.log(`Utilizando el puerto ${port}`);
});
