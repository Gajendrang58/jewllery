require('dotenv').config();
const express = require('express');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
const goldRateRoute = require('./routes/goldRateRoute');
const app = express();
const corsOptions = {
  origin: ['https://jewllery-one.vercel.app'], // <-- Your frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
};
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/gold-rate', goldRateRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
