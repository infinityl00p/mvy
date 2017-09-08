var axios = require('axios');

const ROOT_URL = 'http://localhost:3001/';

module.exports = {
  CheckAuth: function() {
    return axios(ROOT_URL + 'checkauth', {
      method: 'get',
      withCredentials: true,
    })
    .then((response) => {
      return {
        loggedIn: true,
        userId: response.data.userId
      }
    })
  },

  CheckIn: function(cid, uid, today) {
    return axios.post('/challenges/' + cid + '/users/' + uid, {
      today: today
    })
    .then((response) => {
      return response.data;
    })
  },

  GetChallengeData: function(cid) {
    let userChallenge = {};
    userChallenge.users = [];

    return axios.get(ROOT_URL + 'challenges/' + cid)
      .then((response) => {
        userChallenge.challenge = {
            id: cid,
            category: response.data.category,
            description: response.data.description,
            type: response.data.type
          }

        return axios.get(ROOT_URL + 'challenges/' + cid + '/users');
    }).then((response) => {
      userChallenge.users.push({ id: response.data.users[0] }, {id: response.data.users[1]})

        return axios.get(ROOT_URL + 'users/' + userChallenge.users[0].id);
    }).then((response) => {
      userChallenge.users[0].name = response.data.name;

      return axios.get(ROOT_URL + 'users/' + userChallenge.users[1].id);
    }).then((response) => {
      userChallenge.users[1].name = response.data.name;

      return axios.get(ROOT_URL + 'challenges/' + userChallenge.challenge.id + '/users/' + userChallenge.users[0].id);
    }).then((response) => {
      userChallenge.users[0].tally = response.data[0].tally;
      userChallenge.users[0].lastDate = response.data[0].lastDate;

      return axios.get(ROOT_URL + 'challenges/' + userChallenge.challenge.id + '/users/' + userChallenge.users[1].id);
    }).then((response) => {
      userChallenge.users[1].tally = response.data[0].tally;
      userChallenge.users[1].lastDate = response.data[0].lastDate;

      return userChallenge;
    });
  },

  CreateChallenge: function(challenge) {
    return axios.post(
      ROOT_URL + 'challenges', {
        category: challenge.category,
        description: challenge.description,
        type: challenge.type,
        owner: challenge.owner,
        opponent: challenge.opponent
      })
      .then((response) => {
        return response.data.insertId;
      })
  },

  SignIn: function(email, password) {
    return axios(ROOT_URL + 'signin', {
      method: "post",
      data: {
        email: email,
        password: password
      },
      withCredentials: true
    })
    .catch((err) => {
      console.log(err);
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data.userId;
      }
      //TODO: else handle invalid email or password
    })
  },

  SignOut: function() {
    return axios(ROOT_URL + 'signout', {
      method: 'get',
      withCredentials: true
    })
  },

  getUserChallenges: function(userId) {
    return axios.get(ROOT_URL + 'challenges/all/user/' + userId)
    .then((response) => {
      return response.data;
    })
  },

  getPendingChallenges: function(userId) {
    return axios.get(ROOT_URL + 'challenges/pending/' + userId)
    .then((response) => {
      return response.data;
    })
  },

  getUserName: function(userId) {
    return axios.get(ROOT_URL + 'users/' + userId)
    .then((response) => {
      return response.data.name;
    })
  },

  getOpponents: function(userId) {
    return axios.get(ROOT_URL + 'opponents/' + userId)
    .then((response) => {
      return response.data;
    })
  },

  acceptPendingChallenge: function(cid, owner, opponent) {
    return axios.post(ROOT_URL + 'challenges/pending/' + cid, {
      owner: owner,
      opponent: opponent
    })
    .then((response) => {
      return response.data;
    })
  },

  declinePendingChallenge: function(cid, owner, opponent) {
    return axios.delete(ROOT_URL + 'challenges/pending/' + cid, {
      owner: owner,
      opponent: opponent
    })
    .then((response) => {
      return response.data;
    })
  }
}