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

async function login(event) {
    event.preventDefault();
    
    // Sets local storage username value to current username;
    const usernameEl = document.querySelector("#username").value;
    localStorage.setItem("username", usernameEl);
    
    // If a dictionary doesn't already exist in local storage, make one
    if (localStorage.getItem("dictionary") === null) { 
        localStorage.setItem("dictionary", JSON.stringify(Array.from(new Map())));
    }

    // pull the dictionary from storage
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    
    // Add a user object to the dictionary if it isn't already in there
    if (!dictionary.has(usernameEl)) {
        dictionary.set(usernameEl, new Person(usernameEl, [], []));
    }

    let send = await fetch('/api/addUser', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(new Person(usernameEl))
    });

    let response = await fetch('/api/listUsers', {
        method: 'GET',
        headers: {'content-type': 'application/json'}
    });

    let personList = await response.json();
    console.log(personList);

    let getUserObject = await fetch(`/api/getUser/${usernameEl}`, {
        method: 'GET',
        headers: {'content-type': 'application/json'}
    });
    
    let userData = await getUserObject.json();
    console.log(userData);
    console.log(typeof(userData));
    let myUser = new Person(userData.userName, userData.goals, userData.friends);

    myUser.addGoal("wash dishes");

    let updateUser = await fetch('/api/updateUser', {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(myUser)
    });

    // Send the dictionary back up to storage.
    localStorage.setItem("dictionary", JSON.stringify(Array.from(dictionary.entries())));


    window.location.href = "main.html";
  }

function populatePerson() {
    var username = localStorage.getItem("username");
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    var userObject = dictionary.get(username);

    // Sets the username
    var h1El = document.querySelector('.card.personal h1')
    h1El.textContent = username;

    renderGoals();
}

function renderGoals() {
    var username = localStorage.getItem("username");
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    var userObject = dictionary.get(username);
    
    var goalListEl = document.querySelector('.card.personal .goals');
    var parentElement = document.querySelector(".goalList");
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    
    for (var goal of userObject.goals) {
        var labelEl = document.createElement('label');
        var checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        checkboxEl.addEventListener('change', createCheckboxChangeHandler(goal));
        var spanEl = document.createElement('span');
        var pEl = document.createElement('p');
        pEl.textContent = goal;

        labelEl.appendChild(checkboxEl);
        labelEl.appendChild(spanEl);
        labelEl.appendChild(pEl);

        var addGoalEl = document.querySelector(".goalList");
        addGoalEl.appendChild(labelEl);
    }
}

function createCheckboxChangeHandler(goal) {
    return function(event) {
        handleCheckboxChange(event, goal);
    };
}

function handleCheckboxChange(event, goal) {
    var username = localStorage.getItem("username");
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    var userObject = dictionary.get(username);
    
    // Assuming userObject.goals is an array and not an object property
    var index = userObject.goals.indexOf(goal);
    console.log(index);
    if (index !== -1) {
        userObject.goals.splice(index, 1); // Remove the goal from the array
        dictionary.set(username, userObject);
        localStorage.setItem("dictionary", JSON.stringify(Array.from(dictionary.entries())));
        renderGoals(); // Update the UI
    }
}

function addGoal() {
    var username = localStorage.getItem("username");
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    var userObject = dictionary.get(username);
    
    const userInput = document.querySelector("#goalInput").value;

    userObject.goals.push(userInput);
    dictionary.set(username, userObject);
    localStorage.setItem("dictionary", JSON.stringify(Array.from(dictionary.entries())));
    populatePerson();
}

function addFriend() {
    var username = localStorage.getItem("username");
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    var userObject = dictionary.get(username);

    var selectEl = document.createElement('select');
    selectEl.onchange = function() {
        selectFriend(this.value);
    };
    var def = document.createElement('option');
    def.textContent = "friends";
    selectEl.appendChild(def);
    dictionary.forEach(function(value, key) {
        if (!userObject.friends.includes(key) && key !== username) {
            var person = document.createElement('option');
            person.value = key;
            person.textContent = key;
            selectEl.appendChild(person);
        }
    });

    var addFriendCard = document.querySelector('#addFriendCard');
    addFriendCard.appendChild(selectEl);
}

function selectFriend(user) {
    var username = localStorage.getItem("username");
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    var userObject = dictionary.get(username);

    if (!userObject.friends.includes(user) && user !== username) {
        userObject.friends.push(user);
        dictionary.set(username, userObject);
        localStorage.setItem("dictionary", JSON.stringify(Array.from(dictionary.entries())));
        console.log("I made it in here");
    }
    resetAddFriendCard();
}

function resetAddFriendCard() {
    var parentElement = document.querySelector("#addFriendCard");
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    displayFriendCards();
}

function displayFriendCards() {
    var parentElement = document.querySelector(".container");
    var elementsToDelete = parentElement.querySelectorAll(".deleteFriend");
    elementsToDelete.forEach(function(element) {
        element.remove();
    });
    
    var username = localStorage.getItem("username");
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    var userObject = dictionary.get(username);

    for (var user of userObject.friends) {
        displayFriendCard(user);
    }
}

function displayFriendCard(user) {
    var username = localStorage.getItem("username");
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    var userObject = dictionary.get(username);
    
    var containerEl = document.querySelector(".container");

    var cardEl = document.createElement('div');
    cardEl.classList.add("card");
    cardEl.classList.add("deleteFriend");

    var h1El = document.createElement('h1');
    h1El.textContent = user;
    cardEl.appendChild(h1El);

    var goalsEl = document.createElement('div');
    goalsEl.classList.add("goals");

    for (var goal of dictionary.get(user).goals) {
        var labelEl = document.createElement('label');
        var checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        var spanEl = document.createElement('span');
        var pEl = document.createElement('p');
        pEl.textContent = goal;

        labelEl.appendChild(checkboxEl);
        labelEl.appendChild(spanEl);
        labelEl.appendChild(pEl);

        goalsEl.appendChild(labelEl);
    }
    
    var addFriendEl = document.querySelector(".addfriend");
    cardEl.appendChild(goalsEl);
    containerEl.insertBefore(cardEl, addFriendEl);
}

