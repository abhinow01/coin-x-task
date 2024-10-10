const CryptoData = require('../models/cryptoData');
const logger = require('../utils/logger');

/**
 * Handler to get the latest data for a specific cryptocurrency.
 */
async function getStats(req, res) {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Coin query parameter is required" });
  }

  try {
    // Fetch latest data for the coin
    const data = await CryptoData.findOne({ currency: coin }).sort({ timestamp: -1 });

    if (!data) {
      return res.status(404).json({ error: `No data found for ${coin}` });
    }

    // Return the latest price, market cap, and 24h change
    return res.status(200).json({
      price: data.priceUSD,
      marketCap: data.marketCapUSD,
      "24hChange": data.change24h
    });
  } catch (error) {
    logger.error('Error fetching cryptocurrency stats:', error.message);
    return res.status(500).json({ error: error.message });
  }
}

/**
 * Handler to get the standard deviation of the price for a specific cryptocurrency.
 */
async function getDeviation(req, res) {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Coin query parameter is required" });
  }

  try {
    const data = await CryptoData.find({ currency: coin }).sort({ timestamp: -1 }).limit(100);
    console.log("==data", data)
    if (data.length < 2) {
      return res.status(404).json({ error: `Not enough data for ${coin} to calculate deviation` });
    }

    const prices = data.map(record => record.priceUSD);
    const deviation = calculateStandardDeviation(prices);

    return res.status(200).json({ deviation });
  } catch (error) {
    logger.error('Error calculating cryptocurrency deviation:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }
}

/**
 * Helper function to calculate the standard deviation of an array of numbers.
 * @param {Array<number>} values - Array of numeric values.
 * @returns {number} Standard deviation.
 */
function calculateStandardDeviation(values) {
  const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
  const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

module.exports = {
  getStats,
  getDeviation
};
