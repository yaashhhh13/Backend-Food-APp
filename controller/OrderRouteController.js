const OrderModel = require("../model/Order.js")
const stripe = require('stripe')(
    "sk_test_51OosFhSHn7i3OBEmvNlmcAZ1y1mNywJ4DzJEv0XkkytJw7EfVhJ7f4Cd7jjAyw52aUP6AvGK46EJtqStRZP5TqHV00Fazwox11"
)



const CreateOrder = async (req, res) => {
    try {
        const { user, Items, TotalAmount } = req.body;

        // Convert TotalAmount to cents and round it to the nearest integer
        const unitAmount = Math.round(TotalAmount * 100);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "paid for food",
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5173/SuccesfullPayment",
            cancel_url: "http://localhost:5173/PaymentFailure",
        });

        if (session.id) {
            const newOrder = new OrderModel({
                user,
                Items,
                TotalAmount,
            });

            const saveOrder = await newOrder.save();

            await OrderModel.findByIdAndUpdate(saveOrder._id, {
                payment: true,
            });

            res.status(200).json({
                success: true,
                message: "order created successfully",
                data: saveOrder,
                sessionId: session.id,
            });
        } else {
            res.status(200).json({
                success: false,
                message: "not success",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
    }
};


const markOrderAsDelivered = async (req, res) => {
    try {
        const { orderId } = req.body

        const DeliveredOrder = await OrderModel.findById(req.body.OrderId);

        DeliveredOrder.status = "Delivered";
        DeliveredOrder.Payement = true;

        await DeliveredOrder.save()

        res.status(200).json({
            success: true,
            data: DeliveredOrder,
            message: "Delivered"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}


const GetAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find().populate("Items.Food").populate("user");

        res.status(200).json({
            success: true,
            data: orders,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}


const GetSingleOrderDets = async (req, res) => {
    try {
        const { OrderId } = req.body

        const userOrders = await OrderModel.findById(OrderId).populate("Items.Food");

        res.status(200).json({
            success: true,
            data: userOrders,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}


module.exports = { CreateOrder, GetAllOrders, GetSingleOrderDets, markOrderAsDelivered }