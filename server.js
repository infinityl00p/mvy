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


app.get('/users/:uid', function (req,res) {
  const {uid} = req.params;

  connection.query('SELECT name from users where id=?', uid, function(err, results) {
    if (err) {
      return res.status(400).json({
        error: 'Database error - unable to get user',
        id: uid
      });
    } else {
      res.json(results);
    }
  })
})


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
  .post(function (req, res) {
    if(!req.body) {
      return res.status(400).json({error: 'Missing challenge data'});
    }

    const {category} = req.body;
    const {description} = req.body;
    const {type} = req.body;

    connection.query('INSERT INTO challenges (category, description, type) VALUES (?, ?, ?)', [category, description, type], function(err, results) {
      if (err) {
        return res.status(400).json({ error: 'Database error'});
      } else {
        return res.status(200).json(results);
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
    } else if (results.length != 0) {
      return res.json({
        category: results[0].category,
        description: results[0].description,
        type: results[0].type
      });
    } else {
      return res.status(400).json({
        error: 'Bad challenge id',
        cid: cid
      });
    }
  });
});


app.get('/challenges/:cid/users', function(req,res) {
  const {cid} = req.params;

  connection.query('SELECT * FROM user_challenges where cid=?', cid, function(err, results) {
    if (err) {
      return res.status(400).json({
        error: 'Database error',
        cid: cid
      });
    } else {
      res.json({
        users: [results[0].uid, results[1].uid]
      });
    }
  })
})

app.route('/challenges/:cid/users/:uid')
  .get(function(req,res) {
    const {cid} = req.params;
    const {uid} = req.params;

    //TODO: get the last date completed
    connection.query('SELECT count(id) AS tally, max(date_completed) as lastDate FROM tally where uid=? and cid=?', [uid, cid], function(err,results) {
      if (err) {
        return res.status(400).json({
          error: 'Database error',
          cid: cid,
          uid: uid
        });

      } else {
        return res.json(results);
      }
    })
  })
  .post(function(req, res) {
  const {cid} = req.params;
  const {uid} = req.params;
  const {today} = req.body;

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


app.post('/challenges/:cid/users/:uid', function (req, res) {
  const {cid} = req.params;
  const {uid} = req.params;

  //TODO: This should be passed client side so we have clients date and not servers date
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
