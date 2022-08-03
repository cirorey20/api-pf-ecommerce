import express, { Router, Express } from "express";
import postsRouter from "./users/user.router";
import products from "./products/products.router";

function routerApi(app: Express): void {
  const router: Router = express.Router();
  app.use("/api/v1", router); //ruta de api principal api
  router.use("/users", postsRouter);
  router.use("/products", products);
}

// module.exports = routerApi;
export default routerApi;
