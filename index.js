const express = require('express');
const { promisify } = require('util');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const port = process.env.PORT || 5000;

// open the database
let db = new sqlite3.Database(
  './dua_main.sqlite',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    } else {
      console.log('Connected to the database.');
    }
  }
);

// promisify database functions
const dbAll = promisify(db.all.bind(db));
const dbGet = promisify(db.get.bind(db));

// get all dua
app.get('/dua', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM dua LIMIT 1000');
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// get a dua by id
app.get('/dua/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(500).json({ error: 'Id is required' });
    }
    const rows = await dbGet(`SELECT * FROM dua WHERE id=${req.params.id}`);
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// get all category
app.get('/category', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM category LIMIT 1000');
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// get a category by id
app.get('/category/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(500).json({ error: 'Id is required' });
    }
    const rows = await dbGet(
      `SELECT * FROM category WHERE id=${req.params.id}`
    );
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// get all sub category
app.get('/sub-category', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM sub_category LIMIT 1000');
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// get a sub category by id
app.get('/sub-category/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(500).json({ error: 'Id is required' });
    }
    const rows = await dbGet(
      `SELECT * FROM sub_category WHERE id=${req.params.id}`
    );
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send(`dua server is running on port: ${port} `);
});

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});
