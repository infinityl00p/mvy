const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3001));

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
});


app.post('/users', function (req, res) {
  if(!req.body) {
    return res.status(400).json({error: 'Missing user data'});
  }

  const {name} = req.body;
  const {username} = req.body;
  const {password} = req.body;

  connection.query('INSERT INTO users (name, username, password) VALUES (?, ?, ?)', [name, username, password], function(err, results) {
    if (err) {
      return res.status(400).json({ error: 'Database error'});
    } else {
      return res.status(200).json({success: 'User successfully created'});
    }
  });
});


app.route('/challenges')
  .get(function (req, res) {
    connection.query ('SELECT * FROM challenges', function(err, results) {
      if (err) {
        return res.status(400).json({ error: 'Database error - unable to get challenges'});
      } else {
        return res.json(results);
      }
    })
  })
  //TODO: Add specific users to the table, client side have find friend by username and attach both usernames
  .post(function (req, res) {
    if(!req.body) {
      return res.status(400).json({error: 'Missing challenge data'});
    }
    console.log(req.body);

    const {category} = req.body;
    const {description} = req.body;
    const {type} = req.body;

    connection.query('INSERT INTO challenges (category, description, type) VALUES (?, ?, ?)', [category, description, type], function(err, results) {
      if (err) {
        return res.status(400).json({ error: 'Database error'});
      } else {
        return res.status(200).json({success: 'Challenge successfully created'});
      }
    });
  });


app.get('/challenges/:cid', function (req, res) {
  const {cid} = req.params;

  connection.query('SELECT * FROM challenges where id=?', cid, function(err, results) {
    if (err) {
      return res.status(400).json({
        error: 'Database error',
        cid: cid
      });
    } else if (results.length!= 0) {
      return res.json(results);
    } else {
      return res.status(400).json({
        error: 'Bad challenge id',
        cid: cid
      });
    }
  });
});


app.post('/challenges/:cid/users/:uid', function (req, res) {
  const {cid} = req.params;
  const {uid} = req.params;

  //This should be passed client side so we have clients date and not servers date
  var today = new Date();
  today.toISOString().substring(0, 10);

  connection.query('INSERT INTO tally (cid, uid, date_completed) VALUES (?, ?, ?)', [cid, uid, today], function(err, results) {
    if (err) {
      return res.status(400).json({
        error: 'Database Error',
        cid: cid,
        uid: uid
      });
    } else {
      return res.status(200).json({success: 'Challenge successfully updated'});
    }
  })
});


app.put('/challenges/:id', function (req, res) {
  const {id} = req.params;
  //update category, description, type
  const {category} = req.body;
  const {description} = req.body;
  const {type} = req.body;

  connection.query('UPDATE challenges SET category=?, description=?, type=? WHERE id=?', [category, description, type, id], function(err, results) {
    if (err) {
      return res.status(400).json({
        error: 'Database error',
        id: id
      });
    } else {
      return res.status(200).json({success: 'challenge successfully updated'});
    }
  })
});


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
