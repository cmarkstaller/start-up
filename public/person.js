// class Person {
//     userName;
//     goals;
//     friends;

//     constructor(userName, goals = [], friends = []) {
//         this.userName = userName;
//         this.goals = goals;
//         this.friends = friends;
//     }

//     getname() {
//         return(this.userName);
//     }

//     addFriend(person) {
//         this.friends.push(person);
//     }

//     addGoal(goal) {
//         this.goals.push(goal);
//     }
// }

// // Turn two lists into a map
// async function createMap() {
//     let keys = await listUsernames();
//     let values = await listUsers();
    
//     if (keys.length !== values.length) {
//       console.error("Lists must have the same length.");
//       return null;
//     }
  
//     const myMap = new Map();
  
//     for (let i = 0; i < keys.length; i++) {
//       myMap.set(keys[i], values[i]);
//     }
  
//     return myMap;
// }

// // addUser(usernameEl);
// async function addUser(username) {
//     fetch('/api/addUser', {
//         method: 'POST',
//         headers: {'content-type': 'application/json'},
//         body: JSON.stringify(new Person(username))
//     });
// }

// // let myUser = await getUser(usernameEl);
// async function getUser(username) {
//     let getUserObject = await fetch(`/api/getUser/${username}`, {
//         method: 'GET',
//         headers: {'content-type': 'application/json'}
//     });
    
//     let userData = await getUserObject.json();
//     console.log(userData);
//     console.log(typeof(userData));
//     let myUser = new Person(userData.userName, userData.goals, userData.friends);
//     return(myUser);
// }

// // updateUser(myUser);
// async function updateUser(myUser) {
//     fetch('/api/updateUser', {
//         method: 'PUT',
//         headers: {'content-type': 'application/json'},
//         body: JSON.stringify(myUser)
//     });
// }

// // let personList = await listUsers();
// async function listUsers() {
//     let response = await fetch('/api/listUsers', {
//         method: 'GET',
//         headers: {'content-type': 'application/json'}
//     });

//     let personList = await response.json();
//     return(personList);
// }

// // let nameList = await listUsernames();
// async function listUsernames() {
//     let response = await fetch('/api/listUsernames', {
//         method: 'GET',
//         headers: {'content-type': 'application/json'}
//     });

//     let usernameList = await response.json();
//     return(usernameList);
// }

// async function login() {
//     //event.preventDefault();
    
//     // Sets local storage username value to current username;
//     const usernameEl = document.querySelector("#username").value;
//     // localStorage.setItem("username", usernameEl);
    
//     // If a dictionary doesn't already exist in local storage, make one
//     if (localStorage.getItem("dictionary") === null) { 
//         localStorage.setItem("dictionary", JSON.stringify(Array.from(new Map())));
//     }

//     // pull the dictionary from storage
//     var dictionary = await createMap();
    
//     // Add a user object to the dictionary if it isn't already in there
//     if (!dictionary.has(usernameEl)) {
//         addUser(usernameEl);
//     }

//     window.location.href = "main.html";
// }

// function populatePerson() {
//     var username = localStorage.getItem("username");

//     // Sets the username
//     var h1El = document.querySelector('.card.personal h1')
//     h1El.textContent = username;

//     renderGoals();
// }

// async function renderGoals() {
//     // Pull info from local storage
//     var username = localStorage.getItem("username");
//     var dictionary = await createMap();
//     var userObject = dictionary.get(username);
    
//     var goalListEl = document.querySelector('.card.personal .goals');
//     var parentElement = document.querySelector(".goalList");
    
//     // wipe the goals portion of the html
//     while (parentElement.firstChild) {
//         parentElement.removeChild(parentElement.firstChild);
//     }
    
//     for (var goal of userObject.goals) {
//         var labelEl = document.createElement('label');
//         var checkboxEl = document.createElement('input');
//         checkboxEl.type = 'checkbox';
//         checkboxEl.addEventListener('change', createCheckboxChangeHandler(goal));
//         var spanEl = document.createElement('span');
//         var pEl = document.createElement('p');
//         pEl.textContent = goal;

//         labelEl.appendChild(checkboxEl);
//         labelEl.appendChild(spanEl);
//         labelEl.appendChild(pEl);

//         var addGoalEl = document.querySelector(".goalList");
//         addGoalEl.appendChild(labelEl);
//     }
// }

// function createCheckboxChangeHandler(goal) {
//     return function(event) {
//         handleCheckboxChange(event, goal);
//     };
// }

// async function handleCheckboxChange(event, goal) {
//     var username = localStorage.getItem("username");
//     var dictionary = await createMap();
//     var userObject = dictionary.get(username);
    
//     // Assuming userObject.goals is an array and not an object property
//     var index = userObject.goals.indexOf(goal);
//     console.log(index);
//     if (index !== -1) {
//         userObject.goals.splice(index, 1); // Remove the goal from the array
//         updateUser(userObject);
//         renderGoals(); // Update the UI
//     }
// }

// async function addGoal() {
//     var username = localStorage.getItem("username");
//     var dictionary = await createMap();
//     var userObject = dictionary.get(username);
    
//     const userInput = document.querySelector("#goalInput").value;

//     userObject.goals.push(userInput);
//     updateUser(userObject);
//     populatePerson();
// }

// async function addFriend() {
//     var username = localStorage.getItem("username");
//     var dictionary = await createMap();
//     var userObject = dictionary.get(username);

//     var selectEl = document.createElement('select');
//     selectEl.onchange = function() {
//         selectFriend(this.value);
//     };

//     var def = document.createElement('option');
//     def.textContent = "friends";
//     selectEl.appendChild(def);

//     dictionary.forEach(function(value, key) {
//         if (!userObject.friends.includes(key) && key !== username) {
//             var person = document.createElement('option');
//             person.value = key;
//             person.textContent = key;
//             selectEl.appendChild(person);
//         }
//     });

//     var addFriendCard = document.querySelector('#addFriendCard');
//     addFriendCard.appendChild(selectEl);
// }

// async function selectFriend(user) {
//     var username = localStorage.getItem("username");
//     var dictionary = await createMap();
//     var userObject = dictionary.get(username);

//     if (!userObject.friends.includes(user) && user !== username) {
//         userObject.friends.push(user);
//         updateUser(userObject);
//     }
//     resetAddFriendCard();
// }

// function resetAddFriendCard() {
//     var parentElement = document.querySelector("#addFriendCard");
//     while (parentElement.firstChild) {
//         parentElement.removeChild(parentElement.firstChild);
//     }
//     displayFriendCards();
// }

// async function displayFriendCards() {
//     var parentElement = document.querySelector(".container");
//     var elementsToDelete = parentElement.querySelectorAll(".deleteFriend");
//     elementsToDelete.forEach(function(element) {
//         element.remove();
//     });
    
//     var username = localStorage.getItem("username");
//     var dictionary = await createMap();
//     var userObject = dictionary.get(username);

//     for (var user of userObject.friends) {
//         displayFriendCard(user);
//     }
// }

// async function displayFriendCard(user) {
//     var username = localStorage.getItem("username");
//     var dictionary = await createMap();
//     var userObject = dictionary.get(username);
    
//     var containerEl = document.querySelector(".container");

//     var cardEl = document.createElement('div');
//     cardEl.classList.add("card");
//     cardEl.classList.add("deleteFriend");

//     var h1El = document.createElement('h1');
//     h1El.textContent = user;
//     cardEl.appendChild(h1El);

//     var goalsEl = document.createElement('div');
//     goalsEl.classList.add("goals");

//     for (var goal of dictionary.get(user).goals) {
//         var labelEl = document.createElement('label');
//         var checkboxEl = document.createElement('input');
//         checkboxEl.type = 'checkbox';
//         var spanEl = document.createElement('span');
//         var pEl = document.createElement('p');
//         pEl.textContent = goal;

//         labelEl.appendChild(checkboxEl);
//         labelEl.appendChild(spanEl);
//         labelEl.appendChild(pEl);

//         goalsEl.appendChild(labelEl);
//     }
    
//     var addFriendEl = document.querySelector(".addfriend");
//     cardEl.appendChild(goalsEl);
//     containerEl.insertBefore(cardEl, addFriendEl);
// }

// function displayQuote(data) {
//     fetch('https://api.quotable.io/random')
//       .then((response) => response.json())
//       .then((data) => {
//         const containerEl = document.querySelector('#fetchQuote');
  
//         const quoteEl = document.createElement('p');
//         quoteEl.classList.add('quote');
//         const authorEl = document.createElement('p');
//         authorEl.classList.add('person');
  
//         quoteEl.textContent = data.content;
//         authorEl.textContent = data.author;
  
//         containerEl.appendChild(quoteEl);
//         containerEl.appendChild(authorEl);
//     });
// }