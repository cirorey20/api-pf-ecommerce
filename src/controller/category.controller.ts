import sequelize from "../config/sequelize";
import { Request, Response } from 'express';

const { Categories } = sequelize.models;



export const getCategories = async (req: Request, res: Response): Promise<Response> => {
    try {
        const categories = await Categories.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
};