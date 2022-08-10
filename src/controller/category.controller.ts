import sequelize from "../config/sequelize";
import { Request, Response } from "express";
const { Categories } = sequelize.models;

export const getCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const categories = await Categories.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const createCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name, image } = req.body;

    const findCategorie = await Categories.findOne({ where: { name } });
    if (findCategorie) {
      return res.send("Ya existe una categoria con este nombre");
    }
    if (!name) {
      return res.status(404).json({ Error: "Te faltan espacios por llenar" });
    }
    const createCategorie = await Categories.create({ name, image });
    return res
      .status(202)
      .json({ Message: "createCategori Succefully", createCategorie });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};
