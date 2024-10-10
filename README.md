# CoinX Task

## Overview

CoinX is a cryptocurrency data management project that fetches real-time prices, market caps, and 24-hour price changes for major cryptocurrencies such as Bitcoin, Ethereum, and Matic. It stores the data in a database and provides APIs to fetch the latest data and compute statistical deviations.

---

## Project Setup

### Prerequisites

1. **Node.js** and **npm** installed on your machine.
2. **MongoDB**: Ensure you have a MongoDB instance running locally or use a cloud MongoDB provider like MongoDB Atlas.
3. **Environment Variables**: You need to create an `.env` file in the root of the project with the following keys:
   - `MONGO_URI`: MongoDB connection string.
   - `CRYPTO_API_URL`: URL to fetch crypto data (e.g., CoinGecko API URL).
   - `CRYPTO_API_IDS`: Comma-separated list of cryptocurrency IDs to track (e.g., bitcoin, ethereum, polygon).
   - `CRYPTO_API_VS_CURRENCIES`: Currencies for price comparison (e.g., usd).
   - `CRON_SCHEDULE`: The cron schedule for background data fetching (e.g., `0 */2 * * *` for every 2 hours).

### Installation

1. Clone the repository:
   ```bash git clone https://github.com/abhinow01/coin-x-task.git```
2. cd `<your-project-directory>
  npm install`
3. Create your `.env` file with necessary variables
4. Run the application : `npm run dev `

## APIs 
1. `/stats` -   Get Cryptocurrency Stats
   **Request** : 
    - Method: GET
    - Endpoint: /stats
    - Query Parameters:
  coin: The cryptocurrency for which stats are required (e.g., Bitcoin, Ethereum, Matic).
  **Example Request** :
  ``` GET /stats?coin=Bitcoin```
  ***Response*** : ``` {
  "price": 60671,
  "marketCap": 1199016348543.6194,
  "24hChange": -1.8530908220486693
}```

