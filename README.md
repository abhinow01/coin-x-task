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
2. cd `<your-project-directory>`
  `npm install`
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

2. `/deviation` - Get Price Deviation for Cryptocurrency
   **Request** : 
      - Method: GET
      - Endpoint: /deviation
   Query Parameters:
      coin: The cryptocurrency for which deviation is required (e.g., Bitcoin, Ethereum, Matic).
   **Example Request** :
      ```GET /deviation?coin=Bitcoin```

    ***Response*** :```{
  "deviation": 4082.48
      }```

   ### Description
      Calculates the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.
      Note: The coin parameter should start with a capital letter as per the data stored in the database (e.g., Bitcoin, Ethereum).

# Project Structure
 1. ```index.js```
   Main entry point for the application.
   Initializes the Express server and sets up API routes.
   Sets up the cron job to fetch cryptocurrency data every 2 hours.
 2. ```config.js```
   Contains configuration details like API URLs, MongoDB URI, and cron schedule.
 3. ```models/cryptoData.js```
   Contains the Mongoose schema for storing cryptocurrency data in MongoDB.
 4. ```services/cryptoService.js```
   Contains the logic for fetching cryptocurrency data from the API and storing it in MongoDB.
 5. ```cronJobs.js```
   Sets up the cron job to fetch data from the cryptocurrency API every 2 hours.
 6. ```controllers/cryptoController.js```
   Contains the controller logic for handling the /stats and /deviation API routes.
 7. ```logger.js```
  Sets up Winston for logging application events and errors.

# Example  ```.env``` 
```
MONGO_URI=<your-mongo-uri>
CRYPTO_API_URL=<crypto-api-url>
CRYPTO_API_IDS=bitcoin,ethereum,matic-network
CRYPTO_API_VS_CURRENCIES=usd
CRON_SCHEDULE=0 */2 * * * 
```
# Technologies Used
1. Node.js: Backend runtime environment.
2. Express: Web framework to handle HTTP requests.
3. MongoDB: NoSQL database for storing cryptocurrency data.
4. Mongoose: ODM (Object Data Modeling) library for MongoDB in Node.js.
5. Axios: HTTP client for making requests to external APIs.
6. Node-Cron: To schedule periodic background jobs (every 2 hours).
7. Winston: Logger for tracking application events.

         

