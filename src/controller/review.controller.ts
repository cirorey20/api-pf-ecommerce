import sequelize from "../config/sequelize";
import { Request, Response } from "express";
const { Review } = sequelize.models;
const {Products} = sequelize.models;
const { Users } = sequelize.models;


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
    //const { name_id, ProductId, title, description, rating  } = req.body;
    const {description, rating, UserId, ProductId } = req.body;
    console.log(req.body)
    let date: any = new Date();
    date = date.toISOString().split("T")[0];
    const createReview = await Review.create({ date, description, rating, UserId, ProductId});
    //console.log(createReview)

    // const findReview = await Review.findOne({ where: { name } });
    // if (findReview) {
    // }
    
    
    //const createReview = await Review.create({ name_id, ProductId, date, description, rating }); 
    return res
      .status(202)
      .json([{ Message: "Create review succefully", createReview }]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

/* export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //nameProducts(req, res)
  try {
    //devuelvo un arreglo
    const { description, rating } = req.query;
    console.log(req.query);

    const allData = await Review.findAll({
      include: [
        {
          model: Products,
          include: [
            {
              model: Users,
            }
          ],
        },
      ]
    })
    console.log(allData)
    return res.status(200).json({ Message: "Create review succefully", allData })
  }catch(error){
    console.log(error)
    return res.status(500).json("internal server error");
  }
}; */
