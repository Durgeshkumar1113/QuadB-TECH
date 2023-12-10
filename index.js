// index.js

const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL database configuration
const pool = new Pool({
  user: 'your_username',
  host: 'your_host',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

// Fetch data from WazirX API and store it in the database
const fetchDataAndStoreInDatabase = async () => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const top10Data = Object.values(response.data).slice(0, 10);

    for (const item of top10Data) {
      const { symbol, last, buy, sell, volume, baseUnit } = item;
      await pool.query(
        'INSERT INTO crypto_data (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
        [symbol, last, buy, sell, volume, baseUnit]
      );
    }
  } catch (error) {
    console.error('Error fetching and storing data:', error.message);
  }
};

// Express route to get stored data from the database
app.get('/api/cryptoData', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM crypto_data');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data from the database:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  fetchDataAndStoreInDatabase(); // Fetch and store data when the server starts
});
