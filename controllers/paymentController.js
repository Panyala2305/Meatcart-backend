import razorpay from "../utils/razorpay.js";

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Razorpay expects amount in paise
    currency: "INR",
    receipt: "receipt_order_" + Math.random(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};