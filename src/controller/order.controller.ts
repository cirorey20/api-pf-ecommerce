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

const { Orders, ProductOrders, Products, Users } = sequelize.models;

export const getOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { state, dateFrom, dateTo } = req.query as {
    state: string;
    dateFrom: string;
    dateTo: string;
  };
  const where: any = {};

  if (dateFrom && dateTo) {
    const from = new Date(dateFrom).getTime();
    const to = new Date(dateTo).getTime();

    if (!(isNaN(from) && isNaN(to)) && from <= to) {
      where.date = {
        [Op.and]: {
          [Op.gte]: from,
          [Op.lte]: to,
        },
      };
    }
  }

  if (state) {
    where.state = state;
  }

  console.log(where);

  try {
    const orders = await Orders.findAll({
      where,
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
        },
      ],
    });

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

    if (!order) return res.status(404).json({ msg: "Order not found" });
    return res.status(200).json(order);
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

    const payments = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: detail,
      payment_method: id,
      confirm: true,
      customer: newCustomer.id,
      receipt_email: customer.email,
    });

    // Se crea la orden asociandole el user que hizo la compra y la direccion
    let date: any = new Date();
    date = date.toISOString().split("T")[0];
    const order = await Orders.create({
      state: "success",
      UserId: customer.id,
      // AddressId: '4f0c2b41-2952-46d7-87d0-0872c1b03a7c',
      time: date,
    });

    // // Se crea la orden por producti y se asocia a la orden total
    for (let product of stateCart) {
      const orderProducts = ProductOrders.create({
        OrderId: order.toJSON().id,
        ProductId: product.id,
        quantity: product.quantity,
      });
    }

    sendMail(
      [customer.email],
      "Scheduled Report: send link order",
      '<div><h1>Paid succesfull</h1><a href="http://localhost:3000/orders/' +
        order.toJSON().id +
        '">Click in this link for view order</a></div>'
    );

    console.log(payments.charges.data);
    return res.status(200).json({ message: "Successfull payment" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};
