// server
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

const sqlite3 = require('sqlite3').verbose();

// respond with "hello world" when a GET request is made to the homepage
app.get('/search/:min/:max/:letters', function(req, res) {
  let min = req.params.min;
  let max = req.params.max;
  let letters = req.params.letters;

  if (!min) min = 10;
  if (!max) max = 15;

  let lettersQuery = '';
  if (letters !== '_____') {
    let lettersArray = letters.split('');
    let buildQuery = [];
    lettersArray.forEach(letter => {
      buildQuery.push(`AND contains${letter} = 'X'`);
    });
    lettersQuery = buildQuery.join(' ');
  }

  let results = [];
  let db = new sqlite3.Database('names.db3', err => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  let sql = `SELECT name, id FROM names
            WHERE LENGTH(name) >= ${min}
            AND LENGTH(name) <= ${max}
            ${lettersQuery}
             LIMIT 1000`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach(row => {
      results.push([row.name, row.id]);
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

app.listen(3001, () => console.log('App listening on port 3001!'));
