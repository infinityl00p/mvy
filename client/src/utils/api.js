var axios = require('axios');

const ROOT_URL = 'http://mevsu.herokuapp.com/';

module.exports = {
  CheckAuth: async function() {
    return await axios(ROOT_URL + 'checkauth', {
      method: 'get',
      withCredentials: true,
    })
    .then(async (response) => {
      return {
        loggedIn: true,
        userId: response.data.userId
      }
    })
  },

  CheckIn: async function(cid, uid, today) {
    return await axios.post('/challenges/' + cid + '/users/' + uid, {
      today: today
    })
    .then(async (response) => {
      return response.data;
    })
  },

  GetChallengeData: async function(cid) {
    let userChallenge = {};
    userChallenge.users = [];

    return await axios.get(ROOT_URL + 'challenges/' + cid)
      .then(async (response) => {
        userChallenge.challenge = {
            id: cid,
            category: response.data.category,
            description: response.data.description,
            type: response.data.type,
            stakes: response.data.stakes
          }

        return await axios.get(ROOT_URL + 'challenges/' + cid + '/users');
    }).then(async (response) => {
      userChallenge.users.push({ id: response.data.users[0] }, {id: response.data.users[1]})

        return await axios.get(ROOT_URL + 'users/' + userChallenge.users[0].id);
    }).then(async (response) => {
      userChallenge.users[0].name = response.data.name;

      return await axios.get(ROOT_URL + 'users/' + userChallenge.users[1].id);
    }).then(async (response) => {
      userChallenge.users[1].name = response.data.name;

      return await axios.get(ROOT_URL + 'challenges/' + userChallenge.challenge.id + '/users/' + userChallenge.users[0].id);
    }).then(async (response) => {
      userChallenge.users[0].tally = response.data[0].tally;
      userChallenge.users[0].lastDate = response.data[0].lastDate;

      return await axios.get(ROOT_URL + 'challenges/' + userChallenge.challenge.id + '/users/' + userChallenge.users[1].id);
    }).then(async (response) => {
      userChallenge.users[1].tally = response.data[0].tally;
      userChallenge.users[1].lastDate = response.data[0].lastDate;

      return userChallenge;
    });
  },

  CreateChallenge: async function(challenge) {
    return await axios.post(
      ROOT_URL + 'challenges', {
        category: challenge.category,
        description: challenge.description,
        type: challenge.type,
        owner: challenge.owner,
        opponent: challenge.opponent,
        stakes: challenge.stakes
      })
      .then(async (response) => {
        return response.data;
      })
  },

  SignIn: async function(email, password) {
    return await axios(ROOT_URL + 'signin', {
      method: "post",
      data: {
        email: email,
        password: password
      },
      withCredentials: true
    })
    .then(async (response) => {
      if (response.status === 200) {
        return response.data.userId;
      }
    })
  },

  SignOut: async function() {
    return await axios(ROOT_URL + 'signout', {
      method: 'get',
      withCredentials: true
    })
  },

  getUserChallenges: async function(userId) {
    return await axios.get(ROOT_URL + 'challenges/all/user/' + userId)
    .then(async (response) => {
      return response.data;
    })
  },

  getPendingChallenges: async function(userId) {
    return await axios.get(ROOT_URL + 'challenges/pending/' + userId)
    .then(async (response) => {
      return response.data;
    })
  },

  getUserName: async function(userId) {
    return await axios.get(ROOT_URL + 'users/' + userId)
    .then(async (response) => {
      return response.data.name;
    })
  },

  getOpponents: async function(userId) {
    return await axios.get(ROOT_URL + 'opponents/' + userId)
    .then(async (response) => {
      return response.data;
    })
  },

  acceptPendingChallenge: async function(cid, owner, opponent) {
    return await axios.post(ROOT_URL + 'challenges/pending/' + cid, {
      owner: owner,
      opponent: opponent
    })
    .then(async (response) => {
      return response.data;
    })
  },

  declinePendingChallenge: async function(cid, owner, opponent) {
    return await axios.delete(ROOT_URL + 'challenges/pending/' + cid, {
      owner: owner,
      opponent: opponent
    })
    .then(async (response) => {
      return response.data;
    })
  }
}