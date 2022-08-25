import e, { Request, Response } from "express";
import { SearchPathable } from "sequelize/types";
import sequelize from "../config/sequelize";
const { Products, Categories, Review, Users, ProductCategories } =
sequelize.models;

const faker = require("faker")
const { Op } = require("sequelize");


export const generateProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    
    //creamos el producto
    let categories = ["Cuerdas", ["Electrónica", "Percusión"], "Electrónica", "Percusión", ["Acústico", "Viento"], "Acústico", "Viento", ["Metal", "Cuerdas"], "Metal"]
    let imgs = [
      "https://cdn.pixabay.com/photo/2015/06/08/08/30/instruments-801271_960_720.jpg","https://cdn.pixabay.com/photo/2015/11/12/00/41/piano-1039450_960_720.jpg",
      "https://cdn.pixabay.com/photo/2017/03/16/18/17/music-2149880_960_720.jpg","https://cdn.pixabay.com/photo/2017/03/28/23/13/guitar-2183684_960_720.jpg",
      "https://cdn.pixabay.com/photo/2017/05/10/19/42/guitar-2301723_960_720.jpg","https://cdn.pixabay.com/photo/2015/08/28/07/00/guitar-911546_960_720.jpg",
      "https://cdn.pixabay.com/photo/2016/08/10/17/40/guitar-1583851_960_720.jpg","https://cdn.pixabay.com/photo/2015/08/29/14/18/bass-913092_960_720.jpg"
    ]
    for(let i = 0; i < 100; i++) {
      let pro = await Products.create({
        name: faker.commerce.productName(),
        description: faker.lorem.lines(),
        price: parseInt(faker.commerce.price(),10),
        stock: parseInt(faker.commerce.price(10, 20, 0)),
        // categorie: [ categories[Math.floor(Math.random() * categories.length)] ],
        image: imgs[Math.floor(Math.random() * imgs.length)]
      })
      // const arrayCategorie = categories.map((data: any) => ({ name: data }));
      const arrayCategorie = { name: categories[Math.floor(Math.random() * categories.length)] };
      console.log("SOY Ciro",arrayCategorie)
      // const arrayCategorie = "Cuerdas" ;
      let categorys = await Categories.findAll({
        where: {
          [Op.or]: arrayCategorie,
        },
      });
      categorys.map(async (r: any) => {
        await ProductCategories.create({
          ProductId: pro.toJSON().id,
          CategoryId: r.toJSON().id,
        });
      });
    }
    return res
      .status(202)
      .send({ messaje: "Created Successfully :D"});
  } catch (error) {
    console.log(error);
    return res.send({ error: "Internal Server Error -->> createProducts" });
  }
};

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {

  //nameProducts(req, res)
  try {
    //devuelvo un arreglo
    const { categories, price, name, searchName, minrange, maxrange } = req.query;
    console.log(categories);

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
      if (typeof categories === "string") {
        newRows = newRows.filter((p) => {
          const dataCategories = p.ProductCategories.map(
            (c: any) => c.toJSON().Category.name
          );
          return dataCategories.includes(categories);
        });
      } else if (Array.isArray(categories)) {
        // for(let category of categories){ //Filtra productos por las categorias seleccionadas a la vez
        //   newRows = newRows.filter(p => {
        //     const dataCategories = p.ProductCategories.map((c:any) => c.toJSON().Category.name);
        //     return dataCategories.includes(category)
        //   })
        // }
        newRows = newRows.filter((p) => {
          const dataCategories = p.ProductCategories.map(
            (c: any) => c.toJSON().Category.name
          );
          return categories.some((c) => dataCategories.includes(c));
        });
      }
    }

    //for range
    if (minrange && maxrange) {
      let min = newRows.filter((item) => item.price >= minrange)
      let rst = min.filter((item) => item.price <= maxrange)
      return res.send(rst)
    }
    if (minrange ) {
      let min = newRows.filter((item) => item.price <= minrange)
      return res.send(min)
    }
    if(maxrange) {
      let max = newRows.filter((item) => item.price <= maxrange)
      return res.send(max)
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
    if (name && name !== "Z-A" && name !== "A-Z") {
      let productName = newRows.filter((r) => r.name.includes(name));
      return res.status(202).json(productName);
    }
    if (searchName) {
      return nameProducts(req, res);
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
    return res.send({ error: "Internal Server Error -->> createProducts" });
  }
};

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
  const {
    id,
    name,
    description,
    price,
    stock,
    image,
    date,
    categories,
    enable,
  } = req.body as {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    date: string;
    categories: string[];
    enable: boolean;
  };

  try {
    const fields: any = {};
    if (name) fields.name = name;
    if (description) fields.description = description;
    if (price) fields.price = price;
    if (stock) fields.stock = stock;
    if (image) fields.image = image;
    if (date) fields.date = date;
    if (enable === true || enable === false) fields.enable = enable;
    // if (categories) fields.categories = categories;

    if (
      (Object.keys(fields).length === 0 &&
        (categories?.length === 0 || !Array.isArray(categories))) ||
      !id
    )
      return res
        .status(400)
        .json({ status: 400, msg: "Bad request.Verify your data" });

    const [, productUpdate] = await Products.update(fields, {
      where: {
        id,
      },
      returning: true,
    });

    if (productUpdate.length === 0) {
      return res
        .status(400)
        .json({ status: 400, msg: "Bad request.Product not exist" });
    }

    if (categories?.length > 0) {
      await ProductCategories.destroy({
        where: {
          ProductId: id,
        },
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

      for (let r of findCategories) {
        await ProductCategories.create({
          ProductId: id,
          CategoryId: r.toJSON().id,
        });
      }
    }

    return res.status(200).json({ msg: `Update product id ${id}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const nameProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allProducts = await Products.findAll();
  const searchName = req.query.searchName;
  try {
    if (searchName) {
      let productsResult = allProducts.filter((e: any) =>
        e.name.toLowerCase().includes(searchName.toString().toLowerCase())
      );
      return productsResult
        ? res.status(200).send(productsResult)
        : res.status(400).send(`⚠ Ops!!! name not found.Enter valido name`);
    }
  } catch (err) {
    console.log(err);
  }
  return res.status(500).json("internal server error");
};

export const banend = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const userData = await Products.findByPk(id);
    Products.update(
      {
        enable: false,
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

export const desbaned = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const userData = await Products.findByPk(id);
    Products.update(
      {
        enable: true,
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
