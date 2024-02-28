function login() {
    // Sets local storage username value to current username;
    const usernameEl = document.querySelector("#username").value;
    localStorage.setItem("username", usernameEl);
    
    // If a dictionary doesn't already exist in local storage, make one
    if (localStorage.getItem("dictionary") === null) {
        console.log("inside of my if statement");  
        localStorage.setItem("dictionary", JSON.stringify(Array.from(new Map())));
    }

    // pull the dictionary from storage
    var dictionary = new Map(JSON.parse(localStorage.getItem('dictionary')));
    
    // Add a user object to the dictionary if it isn't already in there
    if (!dictionary.has(usernameEl)) {
        dictionary.set(usernameEl, new Person(usernameEl));
    }
    
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
    
    var testGoals = ["wash dishes", "cry"];
    userObject.goals = userObject.goals.concat(testGoals);

    var goalListEl = document.querySelector('.card.personal .goals');

    for (var goal of userObject.goals) {
        var labelEl = document.createElement('label');
        var checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        var spanEl = document.createElement('span');
        var pEl = document.createElement('p');
        pEl.textContent = goal;

        labelEl.appendChild(checkboxEl);
        labelEl.appendChild(spanEl);
        labelEl.appendChild(pEl);

        var addGoalEl = document.querySelector("#addGoalButton");
        goalListEl.insertBefore(labelEl, addGoalEl);
    }
}  

class Person {
    userName;
    goals;
    friends;

    constructor(userName) {
        this.userName = userName;
        this.goals = []
        this.friends = []
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