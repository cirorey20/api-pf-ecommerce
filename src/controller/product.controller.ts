import express, { Router, Request, Response, NextFunction } from "express";
import sequelize from "../config/sequelize";
import { Product } from "../db/models/product.model";

const data = sequelize.models.Product;
//console.log(sequelize.models);

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //devuelvo un arreglo
    const allData = await data.findAll();
    return res.status(202).json(allData);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Error -->> getProducts" });
  }
};

export const createProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //llega data del form
    const { name, decription, price, stock, image } = req.body;
    //validamos si hay campos vacios
    if (!name && !decription) {
      return res.status(404).json({ error: "Faltan espacios por llenar" });
    }
    //creamos el producto
    const createProduct = await data.create({
      name,
      decription,
      price,
      stock,
      image,
    });
    //respondemos el mensaje con el producto
    return res
      .status(202)
      .send({ messaje: "Created Successfully :D", createProduct });
  } catch (error) {
    console.log(error);
    return res.send({ error: "Error -->> createProducts" });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const user = await Product.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "Error -->> deleteProducts" });
  }
};
