
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'JWT Authentication API is running'
    });
});

// API routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect MongoDB and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected Successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error('Database connection failed:', error.message);
        process.exit(1);

    }

};

startServer();
