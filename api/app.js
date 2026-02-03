import express from 'express';
import cors from 'cors';
import routes from './routes/eventRoutes.js';

const app = express();

// Enable CORS for frontend access
app.use(cors({
  origin: '*', // replace with front url
  methods: ['GET', 'POST'], //backend allowing methods
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
