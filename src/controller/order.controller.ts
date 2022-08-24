import { Request, Response } from "express";
import sequelize from "../config/sequelize";
import Stripe from "stripe";
import { Op } from "sequelize";
import { sendMail } from "../helpers/sendMail";
import {
  CANCEL_ORDER,
  FINISH_ORDER,
  UPDATE_ORDER,
} from "../helpers/contentMails";

const stripe = new Stripe(
  "sk_test_51LVJYJHeLDBhzI8LRqnDcuTe8SAf6469CL5sSQg4HVIdbxl0gnaAaPsh6Oid7ayevw1pBoZ3CSvjagcggxFKjeV20016PkydCA",
  {
    apiVersion: "2022-08-01",
  }
);

const { Orders, ProductOrders, Products, Users, Address } = sequelize.models;

export const getOrders = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { state, dateFrom, dateTo, order, user, email } = req.query as {
    state: string;
    dateFrom: string;
    dateTo: string;
    order: string;
    email: string;
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
    console.log(email);
    if (email?.includes("@")) {
      orders = orders.filter((o) => o.toJSON().User.email.includes(email));
    } else if (order) {
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
  //console.log("hola");
  //console.log(idOrder);

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

    const states = ["cancel", "process", "success", "finish"];

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
  const { id, state, email, name, last_name } = req.body;
  console.log(req.body);
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

    console.log(state);

    if (state === "process") {
      sendMail(
        [email],
        "Actualizacion de tu compra",
        UPDATE_ORDER(name, last_name, id)
      );
    }
    if (state === "cancel") {
      sendMail([email], "Compra Cancelada", CANCEL_ORDER(name, last_name, id));
    }
    if (state === "finish") {
      sendMail([email], "Compra finalizada", FINISH_ORDER(name, last_name, id));
    }

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
    
    //Vericación de stock en bodega
    const control = await Promise.all(
      stateCart.map(async (e:any) => {
        return await controlStockBuy(e.id,e.quantity)
      }))

    //Si todos los productos tienen stock se genera compra
    if(!control.includes(true)){

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

    const addressText = `Province: ${address?.toJSON().province} ,City: ${
      address?.toJSON().city
    } , Locality: ${address?.toJSON().locality} ,Street number:  ${
      address?.toJSON().street_number
    }  , Apartment floor: ${address?.toJSON().apartment_floor} `.replace("/n", "");

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

    console.log(payments.charges.data);
  }else return res.status(200).json({ message: "Don't Stock" }); 
  
    stateCart.map((e: any)=>discountStockBuy (e.id, e.quantity))
    var estado = true
  
    return res.status(200).json({ message: "Successfull payment",estado });
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
  //console.log(idUser);
  try {
    const orders = await Orders.findAll({
      where: { UserId: idUser },
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

    let newRows = orders.map((r: any) => {
      let products = r?.dataValues;

      const newObj = {
        state: products.state,
        description: products.ProductOrders.map(
          (e: any) => e.Product.description
        ),
        image: products.ProductOrders.map((e: any) => e.Product.image),
        date: products.date,
        id: products.id,
      };
      return newObj;
    });
    return res.status(200).send(newRows);
  } catch (err) {
    return res.send(err);
  }
};



async function  controlStockBuy (idProduct: any, solicitado: any)  {
  try{
    var producto = await Products.findByPk(idProduct)
    var stockActual = producto?.toJSON().stock
    if (stockActual>=solicitado){
      return false
    }else{ 
      return true  
    }
  }catch(error){
    console.log(error)
}
}


async function discountStockBuy (idProduct: any, toDiscount: any) {
try{
  var producto = await Products.findByPk(idProduct)
  var stockDescontado = (producto?.toJSON().stock) - toDiscount
await Products.update(
  {
      stock: stockDescontado
  },
  {
    where: { id: idProduct },
  }
);
console.log("stock discount update")

} catch (error) {
console.log(error);
}
}

