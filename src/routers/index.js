const express = require("express");

const postsRouter = require("./users/user.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router); //ruta de api principal
  router.use("/users", postsRouter);
}

module.exports = routerApi;

//this is a comment
//comentario 2
