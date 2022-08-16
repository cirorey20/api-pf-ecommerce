import { Request, Response } from "express";
import sequelize from "../config/sequelize";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51LUuaPGOqvRgizQ9MjapMBUmqYBnQzTuvRRkhH2vRh65om1regbCAn9dsvOIG61xxa9kbA8hnNk2NqozaQ91W1mA00ieJAWgCf", {
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
    const { id, amount, stateCart, detail, customer } = req.body

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
        })
    
        //    Se crea la orden asociandole el user que hizo la compra y la direccion
        let date: any = new Date()
        date = date.toISOString().split('T')[0]
        const order = await Orders.create({
            state: 'success',
            UserId: customer.id,
            // AddressId: '4f0c2b41-2952-46d7-87d0-0872c1b03a7c',
            date,
            time: date
        });

        // Se crea la orden por producti y se asocia a la orden total
        for (let product of stateCart) {

            const orderProducts = ProductOrders.create({
                OrderId: order.toJSON().id,
                ProductId: product.id,
                quantity: product.quantity,
            })
        }

        // var data = payments.charges.data
        // var url = data[0].receipt_url
        //console.log(payments.charges.data)
        // var data = payments.charges.data
        // var url = data[0].receipt_url
         console.log(payments)
         return res.status(200).json({ message: 'Successfull payment'});

    } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
};