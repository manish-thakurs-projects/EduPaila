import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs'; // For creating the uploads directory programmatically

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

const __dirname = path.resolve();
const app = express();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*', // Allow requests from the front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you need to handle cookies with requests
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/message', messageRoutes);

// Static files for frontend (make sure 'dist' folder exists)
app.use(express.static(path.join(__dirname, 'EduPaila', 'dist')));

// Catch-all route to serve index.html (SPA handling)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'EduPaila', 'dist', 'index.html'));
});

// Global error handler (added as the last middleware)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack); // Log the error stack
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || 'Internal Server Error',
  });
});

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1); // Exit process on unhandled rejections
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});