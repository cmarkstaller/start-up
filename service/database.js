const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const authCollection = db.collection('auth');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return authCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return authCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await authCollection.insertOne(user);

  return user;
}

async function createPerson(username, goals, friends) {
  const user = {
    username: username,
    goals: goals,
    friends: friends,
  };
  await userCollection.insertOne(user);
}

async function getPerson(username) {
  return userCollection.findOne({ username: username });
}

async function listUsernames() {
  const cursor = userCollection.find({}, {"_id": 0, "username": 1}).project({ username: 1, _id: 0});
  return cursor.toArray();
}

async function listUsers() {
  const cursor = userCollection.find({}, {"_id": 0, "username": 1}).project({ username: 1, _id: 0, goals: 1, friends: 1});
  return cursor.toArray();
}

async function updateUser(username, goals, friends) {
  userCollection.deleteOne({username: { $eq: username}});
  await createPerson(username, goals, friends);
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  createPerson,
  getPerson,
  listUsers,
  listUsernames,
  updateUser,
};
