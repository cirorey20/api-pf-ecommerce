import express, { Router, Express } from "express";
import users from "./users/user.router";
import products from "./products/products.router";
import categories from "./categories/categories.router";
import orders from "./orders/orders.router";
import reviews from "./reviews/reviews.router";

function routerApi(app: Express): void {
  const router: Router = express.Router();
  app.use("/api/v1", router); //ruta de api principal api
  router.use("/users", users);
  router.use("/products", products);
  router.use("/categories", categories);
  router.use("/orders", orders);
  router.use("/reviews", reviews);
}

// module.exports = routerApi;
export default routerApi;
