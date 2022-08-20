import sequelize from "../config/sequelize";
import { Request, Response } from "express";
const { Review } = sequelize.models;

export const getReviews = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const reviews = await Review.findAll();
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const addReview = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { name_id, product_id, title, description, rating  } = req.body;

    // const findReview = await Review.findOne({ where: { name } });
    // if (findReview) {
    // }
    if (!description || !title) {
      return res.status(404).json({ Error: "Te faltan espacios por llenar" });
    }
    let date: any = new Date();
    date = date.toISOString().split("T")[0];
    const createReview = await Review.create({ name_id, product_id, date, title, description, rating });
    return res
      .status(202)
      .json({ Message: "Create review succefully", createReview });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};
