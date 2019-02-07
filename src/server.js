// server
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

const sqlite3 = require('sqlite3').verbose();

// respond with "hello world" when a GET request is made to the homepage
app.get('/search/:options', function(req, res) {
  let { min, max, letters } = req.params.options;
  if (!min) min = 10;
  if (!max) max = 15;

  let results = [];
  let db = new sqlite3.Database('names.db3', err => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  let sql = `SELECT name FROM names
            WHERE LENGTH(name) > ${min}
            AND LENGTH(name) < ${max}
             LIMIT 10`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach(row => {
      results.push(row.name);
    });
    res.send(results);
  });

  // close the database connection
  db.close(err => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});

app.listen(3000, () => console.log('App listening on port 3000!'));
