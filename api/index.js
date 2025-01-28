import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

const __dirname = path.resolve();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*', // Allow requests from the front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // If you need to handle cookies with requests
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

// Serve static files from the front-end
app.use(express.static(path.join(__dirname, 'EduPaila', 'dist')));

// Catch-all route to serve the front-end index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'EduPaila', 'dist', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || 'Internal Server Error',
  });
});

// Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
