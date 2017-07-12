const express = require('express');

const app = express();
app.set('port', (process.env.PORT || 3001));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// TODO: Replace with DB:
var challenges = [
  {
    id: 1,
    challengeText: 'This is challenge one.'
  },
  {
    id: 2,
    challengeText: 'This is challenge two'
  }
];

// TODO: Clean these up so they are in their own files
app.post('/challenges', function (req, res) {
  if(!req.body) return res.sendStatus(400);

  var challenge = {
    id: challenges.length + 1,
    challengeText: req.body.challengeText
  };
  challenges.push(challenge);

  res.sendStatus(200);
});

// For preloading challenges
app.get('/challenges', function (req, res) {
  res.json(challenges);
});

app.get('/challenges/:challengeId', function (req, res) {
  // TODO: Better error handling
  if(req.params.challengeId > challenges.length+1) {
    return res.sendStatus(404);
  }

  var challenge = challenges[req.params.challengeId-1];
  res.json(challenge);
});


app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
