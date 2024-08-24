import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import env from "dotenv";
import axios from "axios";

const app = express();
const port = 3000;
env.config();

/*
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();
*/

app.use(cors());
app.use(bodyParser.json());

let baseLink = 'https://pro-api.coinmarketcap.com'

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


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});