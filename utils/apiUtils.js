const axios = require('axios');
const logger = require('./logger');
const config = require('../config/config');

/**
 * Makes an API request with retries on failure.
 * @param {string} url The URL of the API.
 * @param {Object} params The query parameters for the API request.
 * @param {number} retries The number of retries if the request fails.
 * @param {number} delay The delay between retries in milliseconds.
 * @returns {Promise<Object>} The API response data.
 */
async function fetchDataWithRetry(url, params, retries = config.apiRetryCount, delay = config.apiRetryDelay) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (error) {
      if (attempt === retries) {
        logger.error(`Failed to fetch data after ${retries} attempts: ${error.message}`);
        throw new Error('API request failed after multiple attempts');
      }
      logger.warn(`Attempt ${attempt} failed: ${error.message}. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay)); // Delay between retries
    }
  }
}

module.exports = {
  fetchDataWithRetry
};
