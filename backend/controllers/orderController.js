import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

// eslint-disable-next-line no-undef
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Colocando pedido do usuário p/ frontend
const placeOrder = async (req, res) => {

    const frontend_url = process.env.VITE_API_URL;

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});

        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "brl",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))
        
        line_items.push({
            price_data: {
                currency: "brl",
                product_data: {
                    name: "Taxa de entrega",
                },
                unit_amount: 9.99*100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items : line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json ({success: true, session_url: session.url})

    } catch (error) {
        console.log(error);
        res.json ({success: false, message: "Erro ao criar pedido"})
    }
}

export {placeOrder}	