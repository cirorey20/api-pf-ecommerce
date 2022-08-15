import { Request, Response } from "express";
import sequelize from "../config/sequelize";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51LW3beKXLCV01PVdwurBDoeO3q4nVOvLpwO9fAq6WSmyYsJOQYeuLmWMpZ6X7L63A2GcVhXJr0hRAuTGM8iH1GEX00rmLFjTVS", {
    apiVersion: '2022-08-01',
});

const { Orders, ProductOrders, Products, Users } = sequelize.models;


export const getOrders = async (req: Request, res: Response): Promise<Response> => {
    try {
        const orders = await Orders.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'UserId'],
            },
            include: [{
                model: ProductOrders,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'ProductId', 'OrderId']
                },
                include: [{
                    model: Products
                }]
            },
            {
                model: Users,
                attributes: {
                    exclude: ['password']
                }
            }]
        });

        return res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
};

export const checkout = async (req: Request, res: Response): Promise<Response> => {
    const { id, amount, stateCart, allQuantity, customer } = req.body

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
            description: "Saxophone",
            payment_method: id,
            confirm: true,
            customer: newCustomer.id,
            receipt_email: 'jorgecamargo901@gmail.com'
        })

        // Se crea la orden asociandole el user que hizo la compra y la direccion
        let date: any = new Date()
        date = date.toISOString().split('T')[0]
        const order = await Orders.create({
            state: 'seccess',
            UserId: customer.id,
            // AddressId: '4f0c2b41-2952-46d7-87d0-0872c1b03a7c',
            date,
            time: date
        });

        // // Se crea la orden por producti y se asocia a la orden total
        for (let product of stateCart) {

            const orderProducts = ProductOrders.create({
                OrderId: order.toJSON().id,
                ProductId: product.id,
                quantity: product.quantity,
            })
        }


        console.log(payments.charges.data)
        return res.status(200).json({ message: 'Successfull payment' });

    } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
};