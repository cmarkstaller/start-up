function login() {
    
    if (localStorage.getItem("dictionary") === null) {
        localStorage.setItem('dictionary', JSON.stringify(new Map));
    }
    
    dictionary = JSON.parse(localStorage.getItem('dictionary'));
    
    const nameEl = document.querySelector("#username");
    
    dictionary.set(nameEl, new Person(nameEl));
    
    localStorage.setItem("dictionary", dictionary);
    localStorage.setItem("username", nameEl);
    
    console.log("I made it here");

    window.location.href = "main.html";
  }

function populatePerson() {
    dictionary = JSON.parse(localStorage.getItem('dictionary'));
    console.log(localStorage.getItem("username"));
    
    // let userObject = dictionary.get(localStorage.getItem("username"));

    // const userTag = document.createElement('h1');
    // userTag.textContent = localStorage.getItem("username");

    // const cardEl = document.querySelector('#personal card');
    // cardEl.appendChild(userTag);



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

    addFriend(person) {
        this.friends.push(person);
    }

    addGoal(goal) {
        this.goals.push(goal);
    }
}