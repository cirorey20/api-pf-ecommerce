import { Request, Response } from "express";
import sequelize from "../config/sequelize";
import Stripe from "stripe";
import { Op } from "sequelize";
import { sendMail } from "../helpers/sendMail";

const stripe = new Stripe(
  "sk_test_51LUcLbJTdGcYjfmabXXFoWRSiPxgUKrr7X2dIs5bxIXazcTD6IDMlGNn9DaV77UKzWNtN4iyoXAK6PBaiQoIGKGF00U6tqgLqT",
  {
    apiVersion: "2022-08-01",
  }
);

const { Orders, ProductOrders, Products, Users, Address } = sequelize.models;

export const getOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { state, dateFrom, dateTo, order, user } = req.query as {
    state: string;
    dateFrom: string;
    dateTo: string;
    order: string;
    user: string;
  };
  const whereOrder: any = {};
  const whereUser: any = {};

  if (dateFrom && dateTo) {
    const from = new Date(`${dateFrom} 00:00`).getTime();
    const to = new Date(`${dateTo} 23:59`).getTime();

    if (!(isNaN(from) && isNaN(to)) && from <= to) {
      whereOrder.date = {
        [Op.and]: {
          [Op.gte]: from,
          [Op.lte]: to,
        },
      };
    }
  }

  if (user) {
    whereUser.id = user;
  }

  if (user) {
    whereUser.id = user;
  }

  if (state) {
    whereOrder.state = state;
  }

  console.log(whereOrder);

  try {
    let orders = await Orders.findAll({
      where: whereOrder,
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId"],
      },
      order: [["date", "DESC"]],
      include: [
        {
          model: ProductOrders,
          attributes: {
            exclude: ["createdAt", "updatedAt", "ProductId", "OrderId"],
          },
          include: [
            {
              model: Products,
            },
          ],
        },
        {
          model: Users,
          attributes: {
            exclude: ["password"],
          },
          where: whereUser,
        },
      ],
    });

    if (order) {
      orders = orders.filter((o) => o.toJSON().id.includes(order));
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { idOrder } = req.params;
  console.log("hola");
  console.log(idOrder);

  try {
    const order = await Orders.findByPk(idOrder, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId"],
      },
      include: [
        {
          model: ProductOrders,
          attributes: {
            exclude: ["createdAt", "updatedAt", "ProductId", "OrderId"],
          },
          include: [
            {
              model: Products,
            },
          ],
        },
        {
          model: Users,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
    console.log("por acá");
    if (!order) return res.status(404).json({ msg: "Order not found" });
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const getOrdersStates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // const states = await Orders.findAll({
    //   attributes: ["state"],
    //   group: 'state'
    // });
    // return res.status(200).json(states.map(s => s.toJSON().state));

    const states = ["pending", "process", "success"];

    return res.status(200).json(states);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const setOrderState = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, state } = req.body;

  try {
    const [, order]: any = await Orders.update(
      {
        state,
      },
      {
        where: {
          id,
        },
        returning: true,
      }
    );

    return res.status(200).json(order[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const checkout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id, amount, stateCart, detail, customer } = req.body;

  try {
    const newCustomer = await stripe.customers.create({
      name: `${customer.name} ${customer.last_name}`,
      email: customer.email,
      // address: {
      //     city: 'Yopal',
      //     country: 'CO'
      // }
    });

    const payments: any = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: detail,
      payment_method: id,
      confirm: true,
      customer: newCustomer.id,
      receipt_email: customer.email,
    });
    console.log(payments.charges.data[0].payment_method_details.card.brand);
    // Se crea la orden asociandole el user que hizo la compra y la direccion
    let date: any = new Date();
    date = date.toISOString().split("T")[0];

    const address = await Address.findByPk(customer.AddressId);

    const addressText = `Province : ${address?.toJSON().province} ,City : ${
      address?.toJSON().city
    } , Locality : ${address?.toJSON().locality} ,Numbe:  ${
      address?.toJSON().street_number
    }  , Apartament : ${address?.toJSON().apartment_floor} `.replace("/n", "");

    //console.log(addressText);

    const order = await Orders.create({
      state: "success",
      UserId: customer.id,
      customer: customer.name + " " + customer.last_name,
      address_order: addressText,
      payment_method:
        payments.charges.data[0].payment_method_details.card.brand,
      date,
      time: date,
    });

    // // Se crea la orden por producti y se asocia a la orden total
    for (let product of stateCart) {
      const orderProducts = ProductOrders.create({
        OrderId: order.toJSON().id,
        ProductId: product.id,
        quantity: product.quantity,
        price: product.price,
      });
    }

    sendMail(
      [customer.email],
      "Scheduled Report: send link order",
      '<div><h1>Paid succesfull</h1><a href="http://localhost:3000/orders/' +
        order.toJSON().id +
        '">Click in this link for view order</a></div>'
    );

    //  console.log(payments.charges.data);
    return res.status(200).json({ message: "Successfull payment" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const getOrdersByUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { idUser } = req.params;
  try {
    const orders = await Orders.findAll({
      where: { UserId: idUser },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId", "date", "time"],
      },
      order: [["date", "DESC"]],
      include: [
        {
          model: ProductOrders,
          attributes: {
            exclude: ["createdAt", "updatedAt", "ProductId", "OrderId"],
          },
          include: [
            {
              model: Products,
              attributes: {
                exclude: ["price", "stock"],
              },
            },
          ],
        },
      ],
    });
    let result = orders.map((e: any) => {
      //console.log(e.toJSON());
      return {
        state: e.state,
        productsOrder: e.toJSON().ProductOrders.map((e: any) => ({
          ...e.Product,
          quantity: e.quantity,
          idProductsOrders: e.id,
        })),
      };
    });

    return res.status(200).send(result);
  } catch (err) {
    return res.send(err);
  }
};
