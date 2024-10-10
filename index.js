const express = require('express')
const mongoose = require('mongoose');
const config = require('./config/config');
const logger = require('./utils/logger');
const fetchAndStoreCryptoData = require('./jobs/cryptoJobs')
const cryptoDataController = require('./controllers/cryptoDataController')
const app = express();
// Connect to the database
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('MongoDB connected successfully.');
  })
  .catch((error) => {
    logger.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit on failure
  });

// Start the background job immediately (optional)
fetchAndStoreCryptoData();
app.get('/stats', cryptoDataController.getStats);        // API for fetching latest data
app.get('/deviation', cryptoDataController.getDeviation);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});