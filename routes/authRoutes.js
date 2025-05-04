import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { createOrder } from '../controllers/paymentController.js' 
import { createorder, getUserOrders } from '../controllers/orderController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();
console.log("Routes loaded!");

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post("/payment/create-order", createOrder);
router.post('/createorder', protect, createorder);         // protected POST route
router.get('/my-orders', protect, getUserOrders); // protected GET route

export default router;
