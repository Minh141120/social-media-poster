const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const authRouter = require('./routes/authRoutes');
const middleware = require('./utils/middleware')
const { info, error } = require('./utils/logger');

require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => info('Connected to MongoDB'))
  .catch((err) => error('Error connecting to MongoDB:', err.message));

app.use(cors())
app.use(middleware.requestLogger)
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
