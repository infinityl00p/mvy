const express = require('express');
const mysql = require('mysql');

const app = express();
app.set('port', (process.env.PORT || 3001));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Setup Database connection
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'mvy_db'
})

//Post challenge to challenge table
app.post('/challenges/:id/users/:uid', function (req, res) {
  if(!req.body) {
    return res.status(400).json({error: 'Missing challenge data'});
  }
});

//get a single challenge
app.get('/challenges/:challengeId', function (req, res) {
  const challengeId = req.params.challengeId;

  connection.query('SELECT * FROM challenges where id=?', challengeId, function(err, results) {
    if (err) {
      res.status(400).json({ error: 'Invalid database query'});
    } else if (results.length!= 0) {
      res.json(results);
    } else {
      res.status(400).json({ error: 'Bad challenge id'});
    }
  });
});


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
