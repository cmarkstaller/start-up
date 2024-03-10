class Person {
  userName;
  goals;
  friends;

  constructor(userName, goals, friends) {
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

const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/scores', (_req, res) => {
  res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
  scores = updateScores(req.body, scores);
  res.send(scores);
});

// AddUser
apiRouter.post('/addUser', (req, res) => {
  dictionary.set(req.body.userName, new Person(req.body.userName, req.body.goals, req.body.friends));
  res.status(200).send('Resource updated successfully');
});

// // GetUser
apiRouter.get('/getUser/:username', (req, res) => {
  const username = req.params.username;
  console.log(username);
  console.log(dictionary.get(username));
  res.status(200).send(dictionary.get(username));
  });


// ListUsers
apiRouter.get('/listUsers', (req, res) => {
  const valuesArray = Array.from(dictionary.values());
  res.status(200).send(valuesArray);
});

// // UpdateUser
// apiRouter.put('/updateUser', (req, res) => {

// });

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});