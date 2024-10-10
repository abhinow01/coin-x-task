const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  cryptoApiUrl: process.env.CRYPTO_API_URL,
  cryptoApiIds: process.env.CRYPTO_API_IDS,
  cryptoApiVsCurrencies: process.env.CRYPTO_API_VS_CURRENCIES,
  mongoUri: process.env.MONGO_URI,
  cronSchedule: process.env.CRON_SCHEDULE,
  apiRetryCount: parseInt(process.env.CRYPTO_API_RETRY_COUNT, 10),
  apiRetryDelay: parseInt(process.env.CRYPTO_API_RETRY_DELAY, 10)
};
