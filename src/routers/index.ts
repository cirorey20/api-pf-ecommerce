import express, { Router, Express } from "express";
import postsRouter from "./users/user.router";
import products from "./products/products.router";
import categories from "./categories/categories.router";
import orders from "./orders/orders.router";

function routerApi(app: Express): void {
  const router: Router = express.Router();
  app.use("/api/v1", router); //ruta de api principal api
  router.use("/users", postsRouter);
  router.use("/products", products);
  router.use("/categories", categories);
  router.use("/orders", orders)
}

// module.exports = routerApi;
export default routerApi;
