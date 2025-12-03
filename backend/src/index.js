const express = require("express");
const cors = require("cors");
const compression = require("compression");

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(compression()); // Enable response compression

// CORS configuration
const isDevelopment = process.env.NODE_ENV !== 'production';

app.use(cors({
  origin: function (origin, callback) {
    // In development, allow all origins (for easier debugging)
    if (isDevelopment) {
      return callback(null, true);
    }
    
    // Production mode: strict origin checking
    const allowedOrigins = process.env.FRONTEND_URL 
      ? [process.env.FRONTEND_URL]
      : [
          "http://localhost:5173",
          "http://localhost:3000",
          "http://127.0.0.1:5173",
          "http://127.0.0.1:3000"
        ];
    
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`⚠️ CORS: Rejected origin: ${origin}`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x_authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
route(app);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Than So Hoc API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint không tồn tại."
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Có lỗi xảy ra trên server.",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(port, () =>
  console.log(`🚀 Server listening at http://localhost:${port}`)
);

