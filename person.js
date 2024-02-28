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
    // var userTag = document.createElement('h1');
    // userTag.textContent = username;
    // var cardEl = document.getElementById('personal card');
    // cardEl.appendChild(userTag);

    // Sets the username
    var h1El = document.querySelector('.card.personal h1')
    h1El.textContent = 'New Username';

    var goalListEl = document.querySelector('.card.personal .gaols');
    
    for (var goal of userObject.goals) {
        var labelEl = document.createElement('label');
        var checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        var spanEl = document.createElement('span');
        var pEl = document.createElement('p');
        pEl.textContent = goal;

        labelEl.append(checkboxEl);
        labelEl.append(spaneEl);
        labelEl.append(pEl);

        goalListEl.append(labelEl);
    }
    
    // var ulElement = document.createElement('ul');

    // // Populate the list with data
    // myListData.forEach(function(item) {
    //   var liElement = document.createElement('li');
    //   liElement.textContent = item;
    //   ulElement.appendChild(liElement);
    // });
  
    // Append the list to the container element
    // var listContainer = document.getElementById('listContainer');
    // listContainer.appendChild(ulElement);

    


    // <div class="card personal" id="personal card">
    //         <h1>Username</h1>
    //         <div class="goals">
    //             <label>
    //                 <input type="checkbox">
    //                 <span></span>
    //                 <p>Goal 1</p>
    //             </label>
    //             <label>
    //                 <input type="checkbox">
    //                 <span></span>
    //                 <p>Goal 2</p>
    //             </label>
    //             <label>
    //                 <button class="btn"><i class='bx bx-plus-circle'></i></button>
    //             </label>
    //         </div>
    //     </div>
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