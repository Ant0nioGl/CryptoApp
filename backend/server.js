import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import env from "dotenv";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
db.connect();

app.use(cors());
app.use(bodyParser.json());

let baseLink = 'https://pro-api.coinmarketcap.com'

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};


// GET Route for attaing cryptocurrency metadata (symbol, icon etc.)
app.get('/api/metadata-info', async (req, res) => {
  const { ids } = req.query;
  try {
      const response = await axios.get(baseLink + '/v2/cryptocurrency/info', {
          headers: {
              'X-CMC_PRO_API_KEY': process.env.API_KEY,
          },
          params: {
              id: ids,
          },
      });
      res.json(response.data);
  } catch (err) {
      console.error('Error fetching metadata:', err);
      res.status(500).json({ error: 'Failed to fetch metadata' });
  }
});

// GET Route for attaing latest cryptocurrency info (market cap, percent change per day, week, month etc.)
app.get("/api/listings", async (req, res) => {
  try {
    const response = await axios.get(baseLink + '/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.API_KEY,
      },
    });
    // Success
    res.json(response.data);
    
  } catch (ex) {
    // Fail
    console.log(ex);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// POST Route for handling registration
app.post('/register', async (req, res) => {
  const {name, surname, email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await db.query(query, [email]);
  if (rows.length !== 0) {
    return res.status(400).json({ msg: 'Registration failed.' });
  }
  
  try {
    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into the database
    const insertQuery = 'INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4)';
    await db.query(insertQuery, [name, surname, email, hashedPassword]);

    // Respond with success
    res.status(201).json({ msg: 'Successful registration.' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Error in registration.' });
  }
});

// POST Route for handling login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(query, [email]);

    if (rows.length === 0) {
      return res.status(400).json({ msg: 'User does not exist' });
    }
    const user = rows[0];

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Jwt token creation
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Send success response with token (if using JWT)
    res.json({ msg: 'Login successful', token });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// POST Route for handling crypto purchases
app.post('/purchase', verifyToken, async (req, res) => {
  const { crypto_name, amount, price_at_purchase, fiat_currency } = req.body;
  const user_id = req.user.id;

  const EUR_TO_USD = 1.11; 

  try {
    let priceInUsd = price_at_purchase;

    // Convert the price to USD if the fiat currency is EUR
    if (fiat_currency === 'EUR') {
      priceInUsd = price_at_purchase * EUR_TO_USD;
    }

    // Prepare the query to insert the purchase in USD
    const insertQuery = `
      INSERT INTO purchases (user_id, crypto_name, amount, price_at_purchase) 
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await db.query(insertQuery, [user_id, crypto_name, amount, priceInUsd]);

    res.status(201).json({ msg: 'Purchase successful', purchase: result.rows[0] });
  } catch (err) {
    console.error('Error handling purchase:', err);
    res.status(500).json({ error: 'Failed to complete purchase' });
  }
});


// GET Route for attaining info about user's purchases
app.get('/purchase-info', verifyToken, async (req, res) => {
  const user_id = req.user.id; // Get the current user's ID from the verified token

  try {
    const selectQuery = `
      SELECT crypto_name, SUM(amount) AS total_amount
      FROM purchases 
      WHERE user_id = $1
      GROUP BY crypto_name;
    `;

    const result = await db.query(selectQuery, [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'No purchases found for this user' });
    }

    res.status(200).json({ msg: 'Purchases retrieved successfully', purchases: result.rows });
  } catch (err) {
    console.error('Error retrieving purchases:', err);
    res.status(500).json({ error: 'Failed to retrieve purchases' });
  }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});