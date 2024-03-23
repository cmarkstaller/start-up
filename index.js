const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

class Person {
  userName;
  goals;
  friends;

  constructor(userName, goals = [], friends = []) {
      this.userName = userName;
      this.goals = goals;
      this.friends = friends;
  }

  getname() {
      return(this.userName);
  }

  addFriend(person) {
      this.friends.push(person);
  }

  addGoal(goal) {
      this.goals.push(goal);
  }
}

var dictionary = new Map();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:username', async (req, res) => {
  const user = await DB.getUser(req.params.username);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.username, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// AddUser
secureApiRouter.post('/addUser', async (req, res) => {
  dictionary.set(req.body.userName, new Person(req.body.userName, req.body.goals, req.body.friends));
  await DB.createPerson(req.body.userName, req.body.goals, req.body.friends);
  res.status(200).send('Resource updated successfully');
});

// GetUser
secureApiRouter.get('/getUser/:username', async (req, res) => {
  const username = req.params.username;
  const user = await DB.getPerson(username);
  
  const userInstance = new Person(
    user.username,
    user.goals,
    user.friends
  );

  // const userFromDictionary = dictionary.get(username);
  // const userInstance =  new Person(
  //   userFromDictionary.userName,
  //   userFromDictionary.goals,
  //   userFromDictionary.friends
  // );

  res.status(200).send(userInstance);
  });


// ListUsers
secureApiRouter.get('/listUsers', async (req, res) => {
  //const valuesArray = Array.from(dictionary.values());
  const valuesArray = await DB.listUsers();

  let userArray = [];
  for (let i = 0; i < valuesArray.length; i += 1) {
    let username = valuesArray[i].username;
    let goals = valuesArray[i].goals;
    let friends = valuesArray[i].friends;
    userArray.push(new Person(username, goals, friends));
  }
  res.status(200).send(valuesArray);
});

// ListUsernames
secureApiRouter.get('/listUsernames', async (req, res) => {
  //const valuesArray = Array.from(dictionary.keys());
  const valuesArray = await DB.listUsernames();

  let usernameArray = [];
  for (let i = 0; i < valuesArray.length; i += 1) {
    usernameArray.push(valuesArray[i].username);
  }

  res.status(200).send(usernameArray);
})

// secureApiRouter.get('/listUsernames', async (req, res) => {
//   //const valuesArray = Array.from(dictionary.values());
//   const valuesArray = await DB.listUsers();

//   let userArray = [];
//   for (let i = 0; i < valuesArray.length; i += 1) {
//     let username = valuesArray[i].username;
//     userArray.push(username);
//   }
//   res.status(200).send(valuesArray);
// });

// UpdateUser
secureApiRouter.put('/updateUser', async (req, res) => {
  //dictionary.set(req.body.userName, new Person(req.body.userName, req.body.goals, req.body.friends));
  //console.log(dictionary);
  await DB.updateUser(req.body.username, req.body.goals, req.body.friends);
  res.status(200).send('Resource updated successfully');
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});