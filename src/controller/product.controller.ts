import { Request, Response } from "express";
import sequelize from "../config/sequelize";
const { Products, Categories, Review, Users, ProductCategories } =
  sequelize.models;

const { Op } = require("sequelize");

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    //devuelvo un arreglo
    const { categories, price, name } = req.query;

    const allData = await Products.findAll({
      include: [
        {
          model: ProductCategories,
          include: [
            {
              model: Categories,
            },
          ],
        },
      ],
    });

    let newRows = allData.map((r: any) => {
      let products = r?.dataValues;
      return products;
    });

    if (categories) {
      let filteraArray = newRows.filter((e) => {
        if (
          e.ProductCategories[0]?.Category?.name === categories ||
          e.ProductCategories[1]?.Category?.name === categories ||
          e.ProductCategories[2]?.Category?.name === categories ||
          e.ProductCategories[3]?.Category?.name === categories ||
          e.ProductCategories[4]?.Category?.name === categories
        ) {
          return newRows;
        }
      });
      let newArray = filteraArray.map((e) => {
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          price: e.price,
          stock: e.stock,
          enable: e.enable,
          image: e.image,
          category: e.ProductCategories.map((e: any) => e.Category.name),
        };
      });
      if (newArray.length === 0) {
        return res.status(404).json("NO EXISTE CATEGORIA");
      } else {
        return res.status(202).json(newArray);
      }
    }

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

    return res.status(202).json(newRows);
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
    const { name, description, price, stock, image, categorie } = req.body;
    //validamos si hay campos vacios
    if (!name || !description || !price || !stock || !image || !categorie) {
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

    const arrayCategorie = categorie.map((data: any) => ({ name: data }));
    let categories = await Categories.findAll({
      where: {
        [Op.or]: arrayCategorie,
      },
    });

    categories.map(async (r: any) => {
      await ProductCategories.create({
        ProductId: createProduct.toJSON().id,
        CategoryId: r.toJSON().id,
      });
    });

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
          model: ProductCategories,
          include: [
            {
              model: Categories,
            },
          ],
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
  const { id, name, description, price, stock, image, date, categories, enable } =
    req.body as {
      id: number;
      name: string;
      description: string;
      price: number;
      stock: number;
      image: string;
      date: string;
      categories: string[];
      enable: boolean
    };

  try {

    const fields: any = {};
    if (name) fields.name = name;
    if (description) fields.description = description;
    if (price) fields.price = price;
    if (stock) fields.stock = stock;
    if (image) fields.image = image;
    if (date) fields.date = date;
    if(enable === true || enable === false) fields.enable = enable;
    // if (categories) fields.categories = categories;

    if (Object.keys(fields).length === 0 && (categories?.length === 0 || !Array.isArray(categories)) || !id)
      return res
        .status(400)
        .json({ status: 400, msg: "Bad request.Verify your data" });

    const [,productUpdate] = await Products.update(fields, {
      where: {
        id,
      },
      returning:true
    });


    if(productUpdate.length === 0){
      return res.status(400).json({status:400, msg:"Bad request.Product not exist"});
    }

    if (categories?.length > 0) {
      await ProductCategories.destroy({
        where: {
          ProductId: id
        }
      });

      const newCategories = categories.map((data: any) => ({ name: data }));
      let findCategories = await Categories.findAll({
        where: {
          [Op.or]: newCategories,
        },
      });

      // findCategories.map(async (r: any) => {
      //   await ProductCategories.create({
      //     ProductId: id,
      //     CategoryId: r.toJSON().id,
      //   });
      // });

      for(let r of findCategories){
        await ProductCategories.create({
          ProductId: id,
          CategoryId: r.toJSON().id,
        })
      }

    }

    return res.status(200).json({ msg: `Update product id ${id}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};
