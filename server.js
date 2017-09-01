const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.set('port', (process.env.PORT || 3001));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'moneymoneymoneyteam',
  resave: true,
  saveUninitialized: false,
  cookie: {
    path: '/',
    originalMaxAge: 1000 * 60 * 60 * 24
  }
}));
app.use(passport.initialize());
app.use(passport.session());


// Setup Database connection
const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'mvy_db'
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  connection.query('SELECT * FROM users WHERE id=?', user, function(err, userId) {
    if (err) {
      res.status(400).json({
        error: 'Database Error',
        id: userId[0]
      });
    }

    done(err, userId[0]);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  },
  function(email, password, done) {
    connection.query('SELECT * FROM users WHERE email=?', email, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user.length) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (user[0].password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user[0]);
    });
  }
));

app.post('/signin', passport.authenticate('local'), function(req, res) {
  res.status(200).json({
    status: 'Successfully Signed In!',
    userId: req.session.passport.user
  });
});

function isAuthenticated (req,res,next){
  if(req.session.passport){
    return next();
  }
  else
     return res.status(401).json({
       error: 'User not authenticated'
     })

}

app.get('/checkauth', isAuthenticated, function(req,res) {
  res.status(200).json({
    status: 'User Authenticated!',
    userId: req.session.passport.user
  });
})

app.get('/signout', function(req,res) {
  req.session.destroy();
  res.status(200).json({ success: 'successfully signed out' });
})

app.post('/users', function (req, res) {
  if(!req.body) {
    return res.status(400).json({error: 'Missing user data'});
  }

  const {name} = req.body;
  const {email} = req.body;
  const {password} = req.body;

  connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], function(err, results) {
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

app.get('/challenges/user/:uid', function(req,res) {
  const {uid} = req.params;

  connection.query('SELECT * FROM user_challenges where uid=?', uid, function(err, results) {
    if (err) {
      return res.status(400).json({
        error: 'Database error',
        uid: uid
      });

    } else {
      return res.json(results);
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