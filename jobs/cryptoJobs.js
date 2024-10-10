const cron = require('node-cron');
const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../utils/logger');
const { fetchDataWithRetry } = require('../utils/apiUtils');
const CryptoData = require('../models/cryptoData');

async function fetchAndStoreCryptoData() {
    logger.info('Fetching cryptocurrency data...');
  
    const params = {
      ids: config.cryptoApiIds,
      vs_currencies: config.cryptoApiVsCurrencies,
      include_market_cap: 'true',
      include_24hr_change: 'true'
    };
  
    try {
      const data = await fetchDataWithRetry(config.cryptoApiUrl, params);
      console.log(data); 
  
      
      const cryptoData = [
        {
          currency: 'Bitcoin',
          priceUSD: data.bitcoin.usd,
          marketCapUSD: data.bitcoin.usd_market_cap,
          change24h: data.bitcoin.usd_24h_change
        },
        {
          currency: 'Ethereum',
          priceUSD: data.ethereum.usd,
          marketCapUSD: data.ethereum.usd_market_cap,
          change24h: data.ethereum.usd_24h_change
        },
        {
          currency: 'Matic',
          priceUSD: data['matic-network'].usd,
          marketCapUSD: data['matic-network'].usd_market_cap,
          change24h: data['matic-network'].usd_24h_change
        }
      ];
  
      await CryptoData.insertMany(cryptoData);
  
      logger.info('Crypto data stored successfully.');
    } catch (error) {
      logger.error('Error fetching or storing crypto data:', error.message, error);
    }
  }

cron.schedule(config.cronSchedule, fetchAndStoreCryptoData);

module.exports = fetchAndStoreCryptoData;
