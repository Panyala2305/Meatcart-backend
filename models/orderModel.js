// models/orderModel.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      id: String,
      title: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalAmount: Number,
  paymentId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', orderSchema);
