import express, { Router, Request, Response, NextFunction } from "express";
import sequelize from "../config/sequelize";
const { Users } = sequelize.models;
const check = require("../middlewares/autho");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(
  "677723278728-s1jkmrbpvjhqf98nolkmji6ir1256ql9.apps.googleusercontent.com"
);
async function verify(token: string, cid: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: cid, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  console.log(payload);
  const userid = payload["sub"];
  return payload;
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    console.log(req.body);
    const allData = await Users.findAll();
    return res.status(200).json(allData);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, last_name, email, password, avatar, date, rol } = req.body;
    //  console.log(req.body);
    const valitation = await Users.findOne({ where: { email } });
    if (valitation) return res.send("Este usuario ya existe");

    if (name && last_name && email && password && avatar) {
      const allData = await Users.create({
        name,
        last_name,
        email,
        password,
        avatar,
        date,
        rol,
      });
      return res
        .status(200)
        .json({ Message: "User Create Succesfully :D", allData });
    } else {
      return res.status(404).json({ Error: "Te faltan espacios por llenar" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ Error: "Internal Server Error -->> createUser" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body; //llega info por formulario
    const user = await Users.findOne({ where: { email } }); //buscamos si existe en la db por el email
    if (!user) {
      res.status(404).send("Usuario no existe"); //si no existe  mandamos mensaje de no existe
    }
    const checkPassword = await check.compare(
      password,
      user?.toJSON().password
    ); // si existe comparamos la password para que coincida
    const tokenSession = await check.tokenSign(user);
    if (checkPassword) {
      //si coincide mandamos el usuario
      return res.status(200).send({ user, tokenSession });
    } else {
      return res.status(409).send("Contraseña invalida"); //si no coincide mandamos mensaje de error
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ Error: "Internal Server Error -->> login" });
  }
};

export const loginGoogle = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { credential, clientId } = req.body.response; //llega info por formulario
    const dataUser = await verify(credential, clientId).catch(console.error);
    console.log(dataUser);
    if (!dataUser.email_verified)
      return res.status(404).send("Verificacion de email invalida");

    let user = await Users.findOne({ where: { email: dataUser.email } }); //buscamos si existe en la db por el email
    if (!user) {
      user = await Users.create({
        name: dataUser.name,
        last_name: dataUser.given_name,
        email: dataUser.email,
        password: "google",
        avatar: dataUser.picture,
      });
    }
    // const checkPassword = await check.compare(
    //   password,
    //   user?.toJSON().password
    // ); // si existe comparamos la password para que coincida
    const tokenSession = await check.tokenSign(user);
    if (user) {
      //si coincide mandamos el usuario
      return res.status(200).send({ user, tokenSession });
    } else {
      return res.status(409).send("Contraseña invalida"); //si no coincide mandamos mensaje de error
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ Error: "Internal Server Error -->> login" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    // console.log(id);
    const { name, last_name, avatar, email } = req.body;

    await Users.update(
      {
        name,
        last_name,
        avatar,
        email,
      },
      {
        where: { id: id },
      }
    );
    return res.json("se acutializo");
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ Error: "Intersal Server Errorr -->> updateUser" });
  }
};

export const promote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const userData = await Users.findByPk(id);
    Users.update(
      {
        rol: "admin",
      },
      {
        where: {
          id,
        },
      }
    );
    return res.json("El usuario ahora es Administrador");
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ Error: "Intersal Server Errorr -->> promote" });
  }
};

export const getUserLogin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const tokenSession = req.headers.authorization; //Accedemos a el token del user
    const data = jwt.verify(tokenSession, "autho"); //Verificamos que sea un token valido
    if (data?.id) {
      const user = await Users.findByPk(data.id);
      if (user) {
        return res.status(200).json({ user, tokenSession });
      }
    }

    return res.status(404).send("User not found");
  } catch (error) {
    console.log(error);
    return res
      .status(409)
      .send({ error: "Debes estar logueado para realizar esta accion" });
  }
};
