import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js';
import connectDB from './config/db.js';
import propertyRoutes from './routes/propertyRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import viewingRoutes from './routes/viewingRoutes.js';
// import errorHandler from './middlewares/errorMiddleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/viewings', viewingRoutes);

// Error handling
// app.use(errorHandler);

// Start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});