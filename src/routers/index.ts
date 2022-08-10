import express, { Router, Express } from "express";
import users from "./users/user.router";
import products from "./products/products.router";
import categories from "./categories/categories.router";

function routerApi(app: Express): void {
  const router: Router = express.Router();
  app.use("/api/v1", router); //ruta de api principal api
  router.use("/users", users);
  router.use("/products", products);
  router.use("/categories", categories);
}

// module.exports = routerApi;
export default routerApi;
