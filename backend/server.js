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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});