import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";

const app = express();
const port = 3000;

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
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/api", (req, res) => {
    return res.json({message: "This is from backend."});
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});