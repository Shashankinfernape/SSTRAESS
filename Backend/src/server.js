// backend/src/server.js
import express from 'express';
import 'dotenv/config'; // Make sure this is at the top
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import logger from './config/logger.js';
import errorHandler from './middleware/errorHandler.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middlewares ---

// CORS Configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://jwt-token-refresh-and-expiry-sstrae.vercel.app', // Your Vercel domain
  'https://sstraess.vercel.app' // Your new domain
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      // Origin is allowed
      return callback(null, true);
    } else {
      // Origin not allowed
      logger.warn(`CORS blocked request from origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// --- API Routes ---
app.get('/api', (req, res) => {
  res.json({ 
    message: 'API is running...',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend server is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// --- Error Handling ---
// Not found (404) middleware
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
});

// Centralized error handler
app.use(errorHandler);

// --- Start Server ---
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  logger.info(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});