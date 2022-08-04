import { Request, Response } from "express";
import sequelize from "../config/sequelize";
const { Products, Categories, Review, Users } = sequelize.models;

const { Op } = require("sequelize");

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //devuelvo un arreglo
    const { categories, price, name } = req.query;
    const allData = await Products.findAll();

    let newRows = allData.map((r: any) => {
      let products = r?.dataValues;
      return products;
    });

    //for price
    if (price === "asc") {
      let asc = newRows.sort((first, second) => first.price - second.price);
      return res.send(asc);
    } else if (price === "desc") {
      let desc = newRows.sort((first, second) => second.price - first.price);
      return res.send(desc);
    }

    if (name === "A-Z") {
      let nameSort = newRows.sort((prev: any, next: any) => {
        if (prev.name > next.name) return 1;
        if (prev.name < next.name) return -1;
        return 0;
      });
      return res.status(202).json(nameSort);
    }
    if (name === "Z-A") {
      let nameSort = newRows.sort((prev: any, next: any) => {
        if (prev.name > next.name) return -1;
        if (prev.name < next.name) return 1;
        return 0;
      });
      return res.status(202).json(nameSort);
    }

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
    const { name, description, price, stock, image } = req.body;
    //validamos si hay campos vacios
    if (!name || !description) {
      return res.status(404).json({ error: "Faltan espacios por llenar" });
    }
    //creamos el producto
    const createProduct = await Products.create({
      name,
      description,
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

// export const deleteProducts = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params as { id: string };
//     const user = await Products.findByPk(id);
//     if (user) {
//       await user.destroy();
//       res.json({ message: "User removed" });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json({ error: "Error -->> deleteProducts" });
//   }
// };

export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  //const idProduct = req.params.idProduct as unknown as number;
  try {
    const { id } = req.params;
    const product = await Products.findByPk(id, {
      include: [
        {
          model: Categories,
          through: {
            attributes: [],
          },
        },
        {
          model: Review,
          include: [
            {
              model: Users,
              attributes: {
                exclude: ["password", "rol"],
              },
            },
          ],
        },
      ],
    });
    if (!product)
      return res.status(404).json({ status: 404, msg: "Product not found" });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, name, description, price, stock, image, date, category_id } =
    req.body as {
      id: number;
      name: string;
      description: string;
      price: number;
      stock: number;
      image: string;
      date: string;
      category_id: number;
    };

  try {
    const fields: any = {};
    if (name) fields.name = name;
    if (description) fields.description = description;
    if (price) fields.price = price;
    if (stock) fields.stock = stock;
    if (image) fields.image = image;
    if (date) fields.date = date;
    if (category_id) fields.category_id = category_id;

    if (Object.keys(fields).length === 0 || !id)
      return res
        .status(400)
        .json({ status: 400, msg: "Bad request.Verify your data" });

    await Products.update(fields, {
      where: {
        id,
      },
    });
    return res.status(200).json({ msg: `Update product id ${id}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};
