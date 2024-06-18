const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const socialRouter = require('./routes/socialRoutes');
const { info, error } = require('./utils/logger');
const middleware = require('./utils/middleware')

require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => info('Connected to MongoDB'))
  .catch((err) => error('Error connecting to MongoDB:', err.message));



app.use(cors())
app.use(middleware.requestLogger)
app.use('/api/social', socialRouter);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
})
