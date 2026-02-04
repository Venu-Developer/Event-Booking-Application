import express from 'express';
import cors from 'cors';
import routes from './routes/eventRoutes.js';
import dotenv from "dotenv";
dotenv.config(); // load .env
const app = express();

// Enable CORS for frontend access
app.use(cors({
  // origin: 'https://event-booking-application-client.vercel.app',
  orgin:process.env.CLIENT_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));

// Parse incoming JSON requests
app.use(express.json());
// routes
app.use('/', routes);

//  404 Handler

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});


//   Global Error Handler

app.use((err, req, res, next) => {
  console.error('Global Error:', err);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

export default app;
