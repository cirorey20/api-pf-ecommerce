import { Request, Response, NextFunction } from "express";
import sequelize from "../config/sequelize";
const { Users } = sequelize.models;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const checkRoleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //  console.log(req.headers.authorization);
    const token = req.headers.authorization; //Accedemos a el token del user
    console.log(token, "thi is token ");
    const tokenData = jwt.verify(token, "autho"); //Verificamos que sea un token valido
    const userData = await Users.findByPk(tokenData.id); //Traemos la informacion del usuario por id
    //validamos si el usuario en la propiedad role es admin
    //console.log(userData?.toJSON());
    if (userData?.toJSON().rol === "admin") {
      next(); //si es admin pasamos la siguiente funcion
    } else {
      //SI no, mandamos un mensaje de error
      res
        .status(409)
        .send({ error: "No tienes permisos para generar esta accion" });
    }
  } catch (error) {
    console.log(error);
    res.status(409).send({ error: "Hubo un problema con tu token" });
  }
};

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization; //Accedemos a el token del user
    const tokenData = jwt.verify(token, "autho"); //Verificamos que sea un token valido
    if (tokenData.id) {
      //Si es valido pasamos a la siguiente funcion
      next();
    } else {
      //si no es valido mandamos mensaje de error
      res
        .status(409)
        .send({ error: "Debes estar logueado para realizar esta accion" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .send({ error: "Debes estar logueado para realizar esta accion" });
  }
};

//funcion para comparar la password encriptada con la que me llegua en el form
const compare = async (passwordPlain: any, hashPassword: any) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

//funcion para generar un token a un usuario cada vez que se loguea
const tokenSign = async (user: any) => {
  //TODO: Genera Token
  return jwt.sign(
    {
      id: user.id, //TODO: <---
      rol: user.rol,
    }, //TODO: Payload ! Carga útil
    "autho",
    {
      expiresIn: "50h", //expira en 24Horas
    }
  );
};

export { compare, tokenSign, checkAuth, checkRoleAuth };
