var express = require('express');
var router = express.Router();
var path = require('path');

// Connect string to MySQL
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'fling.seas.upenn.edu',
  user: 'your username',
  password: 'your password',
  database: 'your username'
});

connection.connect(function(err) {
  if (err) {
    console.log('ERROR Connection to DB' + err);
    return;
  }
  console.log('Connection established...');
});

/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});

// Login uses POST request
router.post('/login', function(req, res) {
  // use console.log() as print() in case you want to debug, example below:
  // console.log(req.body); will show the print result in your terminal

  // req.body contains the json data sent from the loginController
  // e.g. to get username, use req.body.username

  /* Write your query here and uncomment line 21 in javascripts/app.js*/
  var query = '\
    INSERT INTO User (username, password)\
    VALUES (\'' + req.body.username + '\', \'' + req.body.password + '\')\
    ON DUPLICATE KEY UPDATE\
      password = \'' + req.body.password + '\';';
  connection.query(query, function(err, rows, fields) {
    if (err)
      console.log('Insertion ERROR: ', err);
    else {
      console.log('rows', rows);
      console.log('fields', fields);
      res.json({
        result: 'success'
      });
    }
  });
});

router.get('/dashboard', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'dashboard.html'));
});

router.get('/users', function(req, res) {
  var query = 'SELECT DISTINCT username FROM User;';
  connection.query(query, function (err, rows, fields) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      console.log(fields);
      res.json(rows);
    }
  });
});

router.get('/genres', function(req, res) {
  var query = 'SELECT DISTINCT genre FROM Genres;';
  connection.query(query, function (err, rows, fields) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      console.log(fields);
      res.json(rows);
    }
  });
});

router.get('/genres/:genre', function(req, res) {
  var genre = req.params.genre;
  var query = '\
    SELECT title, rating, vote_count\
    FROM Movies m, Genres g\
    WHERE g.movie_id = m.id\
      AND genre = \'' + genre + '\'\
    ORDER BY rating DESC, vote_count DESC\
    LIMIT 10;'
  connection.query(query, function (err, rows, fields) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      console.log(fields);
      res.json(rows);
    }
  });
});

router.get('/recommendations', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'recommendations.html'));
});

router.get('/recommendations/:movieID1/:movieID2/:movieID3', function(req, res) {
  var movieID1 = parseInt(req.params.movieID1, 10);
  var movieID2 = parseInt(req.params.movieID2, 10);
  var movieID3 = parseInt(req.params.movieID3, 10);
  var query = '\
    SELECT m.title, g.genre\
    FROM Movies m, Genres g,\
      (SELECT genre, COUNT(movie_id)\
      FROM Genres\
      WHERE movie_id = ' + movieID1 + '\
        OR movie_id = ' + movieID2 + '\
        OR movie_id = ' + movieID3 + '\
      GROUP BY genre\
      ORDER BY COUNT(movie_id) DESC\
      LIMIT 1) temp\
    WHERE g.movie_id = m.id\
      AND g.genre = temp.genre\
    ORDER BY rating DESC\
    LIMIT 10';
  connection.query(query, function(err, rows, fields) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      console.log(fields);
      res.json(rows);
    }
  });
});

router.get('/bestOf', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'bestOf.html'));
});

router.get('/decades', function(req, res) {
  var query = '\
    SELECT DISTINCT (FLOOR(release_year / 10) * 10) AS decade\
    FROM Movies\
    ORDER BY decade;';
  connection.query(query, function (err, rows, fields) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      console.log(fields);
      res.json(rows);
    }
  });
});

router.get('/bestOf/:decade', function(req, res) {
  var decade = parseInt(req.params.decade, 10); // if you have a custom parameter
  var query = '\
    SELECT genre, title, release_year, MAX(vote_count) AS maxVotes\
    FROM Movies m, Genres g\
    WHERE g.movie_id = m.id\
      AND release_year >= ' + decade + '\
      AND release_year <= ' + (decade + 9) + '\
    GROUP BY genre\
    ORDER BY genre';
  connection.query(query, function(err, rows, fields) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      console.log(fields);
      res.json(rows);
    }
  });
});

router.get('/posters', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'posters.html'));
});

router.get('/randomMovies', function(req, res) {
  var query = 'SELECT imdb_id, title FROM Movies ORDER BY RAND() LIMIT 12;';
  connection.query(query, function (err, rows, fields) {
    if (err)
      console.log(err);
    else {
      console.log(rows);
      console.log(fields);
      res.json(rows);
    }
  });
});

router.get('/reference', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'reference.html'));
});

// To add a new page, use the template below
/*
router.get('/routeName', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'fileName.html'));
});
*/

// template for GET requests
/*
router.get('/routeName/:customParameter', function(req, res) {

  var myData = req.params.customParameter;    // if you have a custom parameter
  var query = '';

  // console.log(query);

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
});
*/
module.exports = router;