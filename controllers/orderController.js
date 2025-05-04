// controllers/orderController.js
import Order from '../models/orderModel.js';

export const createorder = async (req, res) => {
  try {
    const newOrder = new Order({
      userId: req.user._id,
      items: req.body.items,
      totalAmount: req.body.totalAmount,
      paymentId: req.body.paymentId,
    });

    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};
