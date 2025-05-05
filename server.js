import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.js';
import authRoutes from './routes/authRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000','http://192.168.1.104:3000'],  // Your Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowing these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowing specific headers
  credentials: true,  // This allows cookies to be sent if needed
  preflightContinue: false,  // Don't continue to the next middleware after preflight response
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Backend 2 is running successfully!");
});

// API routes
app.use('/api', authRoutes);

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).send("❌ Route not found");
});

// Connect to MongoDB and start the server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT,  () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    process.exit(1);
  }
};

startServer();
