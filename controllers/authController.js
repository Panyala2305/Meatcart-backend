import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';  // Updated import from bcrypt to bcryptjs
import User from '../models/userModel.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcryptjs.compare(password, user.password); // Using bcryptjs here
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcryptjs.hash(password, 10);  // Using bcryptjs here

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
