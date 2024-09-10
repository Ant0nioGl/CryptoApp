# Cryptocurrency Application

## Overview
This is a simple simulation of popular cryptocurrency trading platforms like Binance or Coinbase. The application is built using **React**, **Node.js**, and **PostgreSQL**. It allows users to view the top 100 cryptocurrencies and purchase them to store in their personal wallets.

## Features
- **View Top 100 Cryptocurrencies**: Users can browse through the top 100 cryptocurrencies by market capitalization.
- **Purchase Cryptocurrencies**: Users can purchase cryptocurrencies and store them in their accounts.
- **Real-time Data**: Cryptocurrency information is retrieved from the [CoinMarketCap public API](https://coinmarketcap.com/api/).

## Installation

### Clone the repository:
```bash
git clone https://github.com/Ant0nioGl/CryptoApp.git
cd CryptoApp
```

### Install dependencies for both frontend and backend:
### For frontend
```bash
cd frontend
npm install
```

### For backend
```bash
cd ../backend
npm install
```

### Set up the database:
Ensure PostgreSQL is installed and running.
Create a database for the project.
Then, run the queries written in the **queries.sql** file, located in the root directory of the project.

### Configure environment variables:
Create a .env file in the backend directory.
Add necessary environment variables such as database credentials, API keys, etc.
Here is an example:
```bash
#CoinMarketCap API
API_KEY=your-api-key

#Database configuration
USER=exampleUser
HOST=exampleHost
DATABASE=exampleDatabase
PASSWORD=examplePassword
PORT=5432

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
```

### Run the application:
### For backend
```bash
cd backend
nodemon server.js
```

### For frontend
```bash
cd ../frontend
npm run dev
```

### Access the application:
The application should be running on http://localhost:5173
